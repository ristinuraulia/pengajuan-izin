export default function ({ redirect }) {
    const user = JSON.parse(localStorage.getItem("userLogin"))
    if (!user || user.role !== "sekretaris") {
      return redirect("/login")
    }
  }
  