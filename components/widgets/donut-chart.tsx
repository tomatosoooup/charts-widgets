const fakeDonutInfo = [
  {
    id: "1",
    text: "I should not have eaten so much donuts :c",
    author: "John Doe Johnson",
  },

  {
    id: "2",
    text: "Who has stolen my donut ???",
    author: "Mark Ilias Watson",
  },

  {
    id: "3",
    text: "Should I eat this cake ot donut ?",
    author: "Anonym User Net",
  },

  {
    id: "4",
    text: "More data to check widget",
    author: "New User Tester",
  },
];

export const DonutChart = () => {
  return (
    <div className="flex flex-col gap-y-2 h-full overflow-y-auto">
      <h1 className="font-semibold">DonutChart</h1>
      <div className="flex-1 bg-neutral-500/80 rounded-xl flex flex-col items-center gap-y-2 p-2 overflow-y-auto">
        {fakeDonutInfo.map(({ id, text, author }) => (
          <div
            className="border-[3px] border-white p-2 rounded-lg w-full"
            key={id}
          >
            <p className="font-semibold">{text}</p>
            <p className="text-right text-sm">{author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
