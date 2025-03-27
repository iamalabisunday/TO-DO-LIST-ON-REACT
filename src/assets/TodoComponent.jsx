export default function TodoComponent({todoItem}) {
  return (
    <div className="flex justify-between items-center">
      <p>{todoItem}</p>
    </div>
  );
}
