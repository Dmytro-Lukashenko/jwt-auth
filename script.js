const login = async () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  console.log(username, password)

  try {
    const response = await fetch("http://localhost:5001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    console.log(data)
    localStorage.setItem("token", data.token);
    console.log("Login successful");
    window.location.href = "/protected.html";
  } catch (error) {
    console.error(error.message);
  }
};
