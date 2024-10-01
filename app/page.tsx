'use client'

import './_page.scss'

export default function Home() {
  fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => console.warn(json))

  return (
    <div className="container">
      here
    </div>
  );
}
