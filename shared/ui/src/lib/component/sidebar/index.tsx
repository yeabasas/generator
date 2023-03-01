import { Link } from "react-router-dom"
const Sidebar = () => {
  return (
    <div className="text-blue-400 p-6 w-1/5 shadow-2xl h-screen rounded m-1">
      <Link className='hover:text-blue-600' to="/application" >Application</Link>
    </div>
  )
}

export default Sidebar