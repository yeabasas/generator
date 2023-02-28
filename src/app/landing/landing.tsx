import {Link} from 'react-router-dom'
/* eslint-disable-next-line */
export interface LandingProps {}

export function Landing(props: LandingProps) {
 return (
    <div className="flex flex-col">
      <h1>Welcome to Landing!</h1>
      <Link to='/signin'>signin</Link>
      <Link to='/signup'>signup</Link>
    </div>
  );
}

export default Landing;
