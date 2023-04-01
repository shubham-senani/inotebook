import React from 'react'
import { useContext } from 'react'
import noteContext from './context/notes/noteContext';

export default function About() {
  const a = useContext(noteContext);
  return (
    <div>
      <h1>About Section</h1>
      <p>Hello this side {a.name} from batch {a.batch}
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates perspiciatis blanditiis, natus eveniet explicabo nesciunt deleniti aspernatur tenetur sit aliquam consequuntur iusto sint ut, fugit culpa! Sequi odit provident distinctio eius ut ab!
      </p>
    </div>
  )
}
