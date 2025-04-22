import React, { useEffect, useState } from "react"; //Importerer useEffect og useState fra React 
import { Link } from "react-router-dom"; //Importere Link fra react-router-dom
import { client } from "../sanityClient"; //Importere Sanity-klienten

export default function Home() {
  const [members, setMembers] = useState([]); //Lager en state-variabel: "members" for å lagre data om team-medlemmer
  const [logs, setLogs] = useState([]); 

  useEffect(() => { //useEffekt kjører en gang når komponenten kjøres første gang
    //GROQ-forespørsel for å hente teamMember fra Sanity 
    const query = `*[_type == "teamMember"]{
      name,
      email,
      image {
        asset -> {
          url
        }
      },
      slug //Vi henter slug for å lage en rute til hver profil
    }`;

    const fetchMembers = async () => {
      const data = await client.fetch(query); //Kjører GROQ-forspørselet 
      setMembers(data); //Oppdaterer state 
    };

    const fetchLogs = async () => { //Henter logs til Hjemmesiden
      const logQuery = `*[_type == "logg"] | order(dato desc){
        dato,
        navn,
        beskrivelse
      }`;
      
    
      const data = await client.fetch(logQuery); // <- Riktig nå
      setLogs(data);
    };    


    fetchMembers(); //Henter Members Data
    fetchLogs();
  }, []); //Tom Array

  return (
    <main>
      <h2>Gruppe medlemmer</h2>
      <section id="groupmembers">
        {members.length === 0 ? (
          <p>Laster...</p>
        ) : (
          members.map((member) => ( //.Map leser gjennom alle medlemmer og lager en artikkel fo rhver
            <article key={member.name}>
              {/*Link til hver individuell medlem, sin egen side basert på slug*/}
              <Link to={`/team/${member.slug.current}`}>
              {/*Viser bilde til hvert medlem (eller et standardbilde hvis det mangler)*/}
                <img
                  src={member.image?.asset?.url || "path/to/default.jpg"}
                  alt={member.name}
                />
                {/*Viser navn og e-post*/}
                <p>{member.name}</p>
                <p>{member.email}</p>
              </Link>
            </article>
          ))
        )}
      </section>

      <h2>Nyeste logg</h2>
      <section id="logg">
        {logs.length === 0 ? (
          <p>Laster loggdata...</p>
        ) : (
          <ul>
            {logs.map((log, index) => (
              <li key={index}>
                <strong>{log.navn}</strong> - {new Date(log.dato).toLocaleDateString()}:<br/> {/*Gjør at loggene legges i date rekkefølge*/}
                {log.beskrivelse}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
