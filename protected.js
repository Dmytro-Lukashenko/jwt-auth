document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  console.log("token", token)
  if (!token) {
    alert("Access denied! Please login first!");
    window.location.href = "/";
    return;
  }

  try {
    const response = await fetch("http://localhost:5001/api/protected", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) {
      throw new Error("Token is not valid or session is expired");
    }

    const data = await response.json();
    document.getElementById("message").innerText = data.message;
  } catch (error) {
    console.error(error.message);
    alert("Access denied, please login again");
    localStorage.removeItem("token");
    window.location.href = "/";
  }
});
