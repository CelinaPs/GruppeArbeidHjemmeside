import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../sanityClient";
import "../styles/memberDetail.scss";

export default function MemberDetail() {
  const { slug } = useParams(); //Hent slug-parameteren fra URL-en
  const [member, setMember] = useState(null); //Lager en state for å lagre detaljene til ett medlem
  const [logs, setLogs] = useState([]); //Lager en state for å lagre arbeidslogg

  useEffect(() => {
    //GROQ forespørsel for å hente teammedlem basert på slug
    const memberQuery = `*[_type == "teamMember" && slug.current == $slug][0]{
      name,
      email,
      image {
        asset -> {
          url
        }
      },
      bio,
      interests
    }`;

    //GROQ forspørsel for å hente arbeidslogger som matcher navnet/slug
    const logQuery = `*[_type == "logg" && navn == $slug]{
      dato,
      beskrivelse
    }`;

    //Funksjon som kjører begge forespørsmålene og lagrer resultatene i state
    const fetchMemberData = async () => {
      const memberData = await client.fetch(memberQuery, { slug });
      const logData = await client.fetch(logQuery, { slug });
      setMember(memberData);
      setLogs(logData);
    };

    fetchMemberData(); //Kaller funksjonen når komponenten rendres
  }, [slug]); //Kjører på nytt når slug endres

  if (!member) return <p>Laster..</p>; //Viser "Laster.." mens medlem data hentes

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <div className="profile-left">
          <img
            src={member.image?.asset?.url || "path/to/default.jpg"}
            alt={member.name}
            className="profile-image"
          />
        </div>

        <div className="profile-right">
          <h2>{member.name}</h2>
          <p>{member.email}</p>
          <p className="bio">{member.bio}</p>

          <div className="interests">
            <h3>Interesser</h3>
            <ul>
              {member.interests?.map((interest, index) => (
                <li key={index}>{interest}</li> //Lager en liste for alle interesser
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="log-entry">
        <h3>Arbeidslogg</h3>
        {logs.length === 0 ? ( //Hvis det ikke finnes noen logger, viser <p>
          <p>Ingen arbeidslogg tilgjengelig</p>
        ) : (
          <ul>
            {logs.map((log, index) => (
              <li key={`${log.dato}-${index}`}>
                <strong>{log.dato}</strong>: {log.beskrivelse}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
