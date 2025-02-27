from flask import Flask, render_template, redirect, url_for, request, session

app = Flask(__name__)
app.secret_key = "supersecretkey"  # Needed for session management

# Simulated user database
users = {"user@example.com": "password123"}

@app.route("/", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]

        if email in users and users[email] == password:
            session["user"] = email  # Store user in session
            return redirect(url_for("home"))
        else:
            return render_template("login.html", error="Invalid email or password")

    return render_template("login.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]

        if email in users:
            return render_template("register.html", error="Email already exists")
        
        users[email] = password  # Add new user
        return redirect(url_for("login"))

    return render_template("register.html")

@app.route("/home")
def home():
    if "user" not in session:  # Redirect to login if not authenticated
        return redirect(url_for("login"))
    return render_template("home.html")

@app.route("/dashboard")
def dashboard():
    if "user" not in session:
        return redirect(url_for("login"))
    return render_template("dashboard.html")

@app.route("/about")
def about():
    if "user" not in session:
        return redirect(url_for("login"))
    return render_template("about.html")

@app.route("/booking")
def booking():
    if "user" not in session:
        return redirect(url_for("login"))
    return render_template("booking.html")

@app.route("/checkin")
def checkin():
    if "user" not in session:
        return redirect(url_for("login"))
    return render_template("checkin.html")

@app.route("/room")
def room():
    if "user" not in session:
        return redirect(url_for("login"))
    return render_template("room.html")














@app.route("/logout")
def logout():
    session.pop("user", None)
    return redirect(url_for("login"))

if __name__ == "__main__":
    app.run(debug=True)
