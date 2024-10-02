import { HomePage } from "@/app/containers/HomePage"

export default function Home() {
  fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => response.json())
    .then((json) => console.warn(json))

  return (
    <div
      style={{
        width: "100%"
      }}
    >
      <HomePage />
    </div>
  )
}
