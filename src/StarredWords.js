import { Link } from 'react-router-dom';
import React from 'react';

const type = ['adjective', 'verb', 'noun', 'adverb', 'abbreviation'];

function StarredWords() {
  const [searchTerm, setSearchTerm] = React.useState();
  const [checked, setChecked] = React.useState(JSON.parse(window.localStorage.getItem('checked')));
  const [selected, setSelected] = React.useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRemoveChecked = (item) => {
    setChecked(checked.filter((a) => a.id !== item.id));
    setSelected(selected.filter((a) => a.id !== item.id));
  };

  const [open, setOpen] = React.useState([]);
  const handleOpen = (item) => {
    if (open.includes(item.id)) {
      setOpen(open.filter((a) => a !== item.id));
    } else {
      setOpen([...open, item.id]);
    }
  };

  const [filter, setFilter] = React.useState([]);
  console.log(filter, selected, checked);

  const handleFiltered = (value) => {
    console.log(value);
    if (filter.indexOf(value) === -1) {
      setFilter([...filter, value]);
    } else {
      setFilter(filter.filter((it) => it !== value));
    }
  };

  React.useEffect(() => {
    window.localStorage.setItem('checked', JSON.stringify(checked));
  }, [checked]);

  React.useEffect(() => {
    if (filter.length === 0 && (!searchTerm || searchTerm === '')) {
      setSelected(checked);
    } else if (filter.length === 0) {
      setSelected(checked.filter((element) => element.name.indexOf(searchTerm) == 0));
    } else if (!searchTerm || searchTerm === '') {
      setSelected(checked.filter((element) => filter.indexOf(element.fl) >= 0));
    } else {
      setSelected(
        checked.filter(
          (element) => element.name.indexOf(searchTerm) == 0 && filter.indexOf(element.fl) >= 0
        )
      );
    }
  }, [searchTerm, filter]);

  React.useEffect(() => {
    setChecked(JSON.parse(window.localStorage.getItem('checked')));
    setSelected(checked);
  }, []);

  return (
    <div className="static">
      <div className="relative m-2.5 min-h-16 rounded-md bg-[#81bef5]">
        <Link to="/">
          <h5 className="px-8 py-4 text-xl text-white">Word Keeper</h5>
        </Link>
        <button className="absolute inset-y-0 right-0 pr-8 text-xl text-white">
          ★ Starred Words
        </button>
      </div>
      <div className="flex items-start mt-5">
        <div className="flex-none flex-col relative bg-[#efefef] rounded-md h-60 w-96 m-2.5">
          <input
            className="absolute focus:outline-none focus:ring focus:border-[#81bef5] inset-x-0 top-0 mt-5 mx-4 px-5 py-4 rounded-md"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleChange}
          />
          <div className="absolute flex flex-col inset-x-0 top-0 mt-20 mx-4 text-xl">
            {type.map((part) => (
              <label>
                <input
                  type="checkbox"
                  value={part}
                  onChange={() => handleFiltered(part)}
                  name="myCheckbox"
                />{' '}
                {part}
              </label>
            ))}
          </div>
        </div>
        <div className="relative grow m-2.5">
          {selected?.map((item) => (
            <div className="relative flex flex-col gap-2">
              <div className="flex flex-row bg-white rounded-md">
                <h5 onClick={() => handleOpen(item)} className="px-8 py-4 text-xl font-bold">
                  {item.name}
                </h5>
                <h5 className="px-8 py-4 text-xl italic">{item.fl}</h5>
                <h5 className="px-8 py-4 text-xl">
                  {item.shortdef?.toString().length > 60
                    ? item.shortdef?.toString().substring(0, 60) + '...'
                    : item.shortdef?.toString()}
                </h5>
              </div>
              <div className="absolute inset-y-0 right-0 pr-8 pt-1.5">
                <button
                  onClick={() => handleRemoveChecked(item)}
                  className="text-[#81bef5] text-4xl">
                  ★
                </button>
              </div>
              {open.includes(item.id) ? (
                <div className="flex flex-row bg-[#81bef5] rounded-md">
                  {item?.prs === 0 || <h5 className="px-8 py-4 text-xl italic">{item.prs}</h5>}
                  <h5 className="px-8 py-4 text-xl">{item.shortdef?.toString()}</h5>
                </div>
              ) : (
                ''
              )}
              <br />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StarredWords;
