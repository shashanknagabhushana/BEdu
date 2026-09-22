import sqlite3, hashlib, secrets, json
from pathlib import Path
from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, JSONResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from starlette.middleware.sessions import SessionMiddleware

BASE=Path(__file__).parent
DB=BASE/"bedu.db"
app=FastAPI(title="BEdu")
app.add_middleware(SessionMiddleware, secret_key="bedu-v1-local-secret-change-me", max_age=60*60*24*7)

def db():
    c=sqlite3.connect(DB); c.row_factory=sqlite3.Row; return c
def init():
    c=db()
    c.executescript("""
    CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,email TEXT UNIQUE,password TEXT,goal TEXT,skills TEXT,created_at TEXT DEFAULT CURRENT_TIMESTAMP);
    CREATE TABLE IF NOT EXISTS resources(id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT,category TEXT,level TEXT,description TEXT);
    CREATE TABLE IF NOT EXISTS opportunities(id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT,company TEXT,location TEXT,type TEXT,skills TEXT,description TEXT);
    CREATE TABLE IF NOT EXISTS assessments(id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT,category TEXT,difficulty TEXT,duration INTEGER);
    CREATE TABLE IF NOT EXISTS questions(id INTEGER PRIMARY KEY AUTOINCREMENT,assessment_id INTEGER,question TEXT,options TEXT,answer INTEGER);
    CREATE TABLE IF NOT EXISTS results(id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER,assessment_id INTEGER,score INTEGER,total INTEGER,created_at TEXT DEFAULT CURRENT_TIMESTAMP);
    CREATE TABLE IF NOT EXISTS saved_jobs(user_id INTEGER,opportunity_id INTEGER,UNIQUE(user_id,opportunity_id));
    """)
    if c.execute("SELECT COUNT(*) n FROM resources").fetchone()["n"]==0:
        c.executemany("INSERT INTO resources(title,category,level,description) VALUES(?,?,?,?)",[
        ("Java Fundamentals","Java","Beginner","Variables, OOP, collections and practical coding basics."),
        ("SQL Fundamentals","SQL","Beginner","Queries, joins, grouping and database essentials."),
        ("Aptitude & Reasoning","Aptitude","Beginner","Quantitative aptitude, logical reasoning and interview practice."),
        ("Python for AI","Python","Beginner","Python foundations for data and generative AI workflows."),
        ("DSA Essentials","DSA","Intermediate","Arrays, strings, stacks, queues and complexity basics."),
        ("Interview Communication","Career","Beginner","HR introduction, communication and interview preparation.")])
        c.executemany("INSERT INTO opportunities(title,company,location,type,skills,description) VALUES(?,?,?,?,?,?)",[
        ("Graduate Software Trainee","TechNova","Hyderabad","Full-time","Java, SQL","Entry-level software role focused on training and application development."),
        ("AI / Data Intern","Aster Labs","Remote","Internship","Python, AI","Student internship supporting AI and data projects."),
        ("Junior QA Engineer","QualityWorks","Bengaluru","Full-time","Testing, SQL","Entry-level testing and quality engineering role."),
        ("Cloud Support Associate","CloudBridge","Hyderabad","Full-time","GCP, Linux","Graduate role supporting cloud applications and operations.")])
        c.execute("INSERT INTO assessments(title,category,difficulty,duration) VALUES(?,?,?,?)",("Java Fundamentals","Java","Beginner",10))
        aid=c.lastrowid
        qs=[("Which keyword is used to inherit a class in Java?",["implements","extends","inherits","super"],1),
            ("Which collection does not allow duplicate elements?",["List","Set","Map","Array"],1),
            ("Which method is the entry point of a Java application?",["start()","run()","main()","init()"],2),
            ("Which type stores true/false values?",["bool","boolean","bit","logical"],1),
            ("Which is used to create an object?",["new","class","this","void"],0)]
        c.executemany("INSERT INTO questions(assessment_id,question,options,answer) VALUES(?,?,?,?)",
                      [(aid,q,json.dumps(o),a) for q,o,a in qs])
    c.commit(); c.close()
init()
app.mount("/static",StaticFiles(directory=BASE/"static"),name="static")

def user(request):
    uid=request.session.get("uid")
    if not uid:return None
    c=db(); u=c.execute("SELECT * FROM users WHERE id=?",(uid,)).fetchone();c.close();return dict(u) if u else None
def hashpw(p): return hashlib.sha256(p.encode()).hexdigest()

@app.get("/",response_class=HTMLResponse)
def home():
    return (BASE/"static"/"index.html").read_text()

@app.get("/api/me")
def me(request:Request):
    u=user(request)
    if not u:return {"authenticated":False}
    u["skills"]=json.loads(u["skills"] or "[]")
    return {"authenticated":True,"user":u}

@app.post("/api/register")
def register(request:Request,name:str=Form(...),email:str=Form(...),password:str=Form(...),goal:str=Form(...)):
    c=db()
    try:
        c.execute("INSERT INTO users(name,email,password,goal,skills) VALUES(?,?,?,?,?)",(name,email.lower(),hashpw(password),goal,json.dumps([])))
        c.commit(); uid=c.execute("SELECT id FROM users WHERE email=?",(email.lower(),)).fetchone()["id"]
    except sqlite3.IntegrityError:return JSONResponse({"ok":False,"error":"Email already registered"},400)
    finally:c.close()
    request.session["uid"]=uid
    return {"ok":True}

@app.post("/api/login")
def login(request:Request,email:str=Form(...),password:str=Form(...)):
    c=db();u=c.execute("SELECT * FROM users WHERE email=? AND password=?",(email.lower(),hashpw(password))).fetchone();c.close()
    if not u:return JSONResponse({"ok":False,"error":"Invalid email or password"},401)
    request.session["uid"]=u["id"];return {"ok":True}

@app.post("/api/logout")
def logout(request:Request):
    request.session.clear();return {"ok":True}

@app.get("/api/resources")
def resources():
    c=db();rows=[dict(x) for x in c.execute("SELECT * FROM resources ORDER BY id")];c.close();return rows

@app.get("/api/opportunities")
def opportunities(request:Request):
    c=db(); rows=[dict(x) for x in c.execute("SELECT * FROM opportunities ORDER BY id DESC")]; saved=set()
    u=user(request)
    if u:saved={x["opportunity_id"] for x in c.execute("SELECT opportunity_id FROM saved_jobs WHERE user_id=?",(u["id"],))}
    c.close()
    for x in rows:x["saved"]=x["id"] in saved
    return rows

@app.post("/api/opportunities/{oid}/save")
def save_job(request:Request,oid:int):
    u=user(request)
    if not u:return JSONResponse({"error":"Login required"},401)
    c=db();c.execute("INSERT OR IGNORE INTO saved_jobs VALUES(?,?)",(u["id"],oid));c.commit();c.close();return {"ok":True}

@app.delete("/api/opportunities/{oid}/save")
def unsave_job(request:Request,oid:int):
    u=user(request)
    if not u:return JSONResponse({"error":"Login required"},401)
    c=db();c.execute("DELETE FROM saved_jobs WHERE user_id=? AND opportunity_id=?",(u["id"],oid));c.commit();c.close();return {"ok":True}

@app.get("/api/assessments")
def assessments():
    c=db();a=[dict(x) for x in c.execute("SELECT * FROM assessments")];c.close();return a

@app.get("/api/assessments/{aid}")
def assessment(aid:int):
    c=db();a=c.execute("SELECT * FROM assessments WHERE id=?",(aid,)).fetchone()
    qs=[dict(x) for x in c.execute("SELECT id,question,options FROM questions WHERE assessment_id=?",(aid,))]
    c.close()
    if not a:return JSONResponse({"error":"Not found"},404)
    for q in qs:q["options"]=json.loads(q["options"])
    return {"assessment":dict(a),"questions":qs}

@app.post("/api/assessments/{aid}/submit")
async def submit(request:Request,aid:int):
    u=user(request)
    if not u:return JSONResponse({"error":"Login required"},401)
    data=await request.json(); answers=data.get("answers",[])
    c=db(); qs=c.execute("SELECT answer FROM questions WHERE assessment_id=? ORDER BY id",(aid,)).fetchall()
    total=len(qs);score=sum(1 for i,q in enumerate(qs) if i<len(answers) and answers[i]==q["answer"])
    c.execute("INSERT INTO results(user_id,assessment_id,score,total) VALUES(?,?,?,?)",(u["id"],aid,score,total));c.commit();c.close()
    return {"score":score,"total":total,"percentage":round(score/total*100) if total else 0}

@app.get("/api/results")
def results(request:Request):
    u=user(request)
    if not u:return JSONResponse({"error":"Login required"},401)
    c=db();r=[dict(x) for x in c.execute("""SELECT r.*,a.title FROM results r JOIN assessments a ON a.id=r.assessment_id WHERE r.user_id=? ORDER BY r.id DESC""",(u["id"],))];c.close();return r

@app.put("/api/profile")
async def profile(request:Request):
    u=user(request)
    if not u:return JSONResponse({"error":"Login required"},401)
    d=await request.json();skills=d.get("skills",[])
    c=db();c.execute("UPDATE users SET name=?,goal=?,skills=? WHERE id=?",(d.get("name",u["name"]),d.get("goal",u["goal"]),json.dumps(skills),u["id"]));c.commit();c.close();return {"ok":True}

@app.get("/api/ai/recommendations")
def ai_recommendations(request:Request):
    u=user(request)
    if not u:return JSONResponse({"error":"Login required"},401)
    skills=json.loads(u["skills"] or "[]"); goal=(u["goal"] or "").lower()
    rec=[]
    if "java" not in [s.lower() for s in skills]:rec.append({"title":"Java Fundamentals","reason":"Build a foundation for entry-level software roles."})
    if "sql" not in [s.lower() for s in skills]:rec.append({"title":"SQL Fundamentals","reason":"SQL is useful across software, data and support roles."})
    if "python" not in [s.lower() for s in skills]:rec.append({"title":"Python for AI","reason":"Useful for AI, data and automation projects."})
    rec.append({"title":"Aptitude & Reasoning","reason":"Practice common placement assessment patterns."})
    return {"message":f"Based on your goal — {u['goal']} — BEdu recommends this starting path.","recommendations":rec[:4]})
