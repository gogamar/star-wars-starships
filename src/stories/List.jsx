import Card from "./Card";

export default function List({ elements, title }) {
  return (
    <div className="bg-dark py-6 sm:py-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-xl tracking-widest uppercase text-gray-500 border-y border-gray-800 py-2 my-6">
          {title}
        </h1>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4"
        >
          {elements.map((element) => (
            <Card key={element.id} element={element} />
          ))}
        </ul>
      </div>
    </div>
  );
}
