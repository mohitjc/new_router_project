import { NavLink } from "react-router"

interface props {
    to:any
    className?:any
    activeClass?:any
    children?:any
}
export default function NavLinkMain({to,className,children,activeClass}:props){
    return <NavLink to={to}  className={({ isActive, isPending, isTransitioning }:any) =>
    [
      isPending ? "pending" : "",
      isActive ? activeClass : "",
      isTransitioning ? "transitioning" : "",
      className?className:''
    ].join(" ")
  }>
{children}
    </NavLink>
}

