try {
    document.getElementById("id").value = location.search.split("?id=").pop(0) 
  } catch (error) {
    console.log("ignora este error.")
  }