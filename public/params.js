try {
  document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("id").value = location.search.split("?id=").pop();
});

  } catch (error) {
    console.log("ignora este error.")
  }