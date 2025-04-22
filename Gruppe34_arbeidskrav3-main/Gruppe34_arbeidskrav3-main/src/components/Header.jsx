import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { client } from "../sanityClient";
import "../styles/Layout.scss";

export default function Header() {
  const [members, setMembers] = useState([]); //State for å lagre listen med medlemmer

  useEffect(() => {
    const query = `*[_type == "teamMember"]{
      name,
      "slug": slug.current
    }`; //GROQ forspørsel for å hente navn og slug for hvert teammedlemS

    client.fetch(query).then((data) => {
      setMembers(data); //Henter data og setter den i state
    });
  }, []);

  return (
    <header className="menu">
      <Link to="/" className="team">TEAM 34</Link> {/*Logo-link tilbake til forsiden*/}
      <nav className="navList">
        <Link to="/">Hjem</Link> {/*Link til hjemmesiden*/}
        <span>|</span> {/*Lager et mellomrom mellom komponenter*/}
        {members.map((member, index) => (
          <span key={member.slug}>
            <Link to={`/team/${member.slug}`}>{member.name}</Link>
            {/*Lager en link til hver medlem side basert på slug*/}
            {index < members.length - 1 && <span> | </span>}
            {/*Legger til | mellom navn, men ikke etter siste navn*/}
          </span>
        ))}
      </nav>
    </header>
  );
}
