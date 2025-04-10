export default function ({ redirect }) {
  if (process.client) {
    const user = JSON.parse(localStorage.getItem("userLogin"))
    if (!user || user.role !== "wali_kelas") {
      return redirect("/login")
    }
  }
}
