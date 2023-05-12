import { Link } from 'react-router-dom';
import React from 'react';

const Dictionary = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const [checked, setChecked] = React.useState(
    JSON.parse(window.localStorage.getItem('checked')) || []
  );

  const handleAddChecked = (item) => {
    setChecked([...checked, item]);
  };

  const handleRemoveChecked = (item) => {
    setChecked(checked.filter((a) => a.id !== item.id));
  };

  // React.useEffect(() => {
  //   setChecked(JSON.parse(window.localStorage.getItem('checked')));
  // }, []);

  React.useEffect(() => {
    window.localStorage.setItem('checked', JSON.stringify(checked));
  }, [checked]);

  const [open, setOpen] = React.useState([]);

  const handleOpen = (item) => {
    if (open.includes(item.id)) {
      setOpen(open.filter((a) => a !== item.id));
    } else {
      setOpen([...open, item.id]);
    }
  };

  function isChecked(item) {
    const getIdsArray = checked?.map(({ id }) => id);
    getIdsArray?.includes(item.id);
    return getIdsArray?.includes(item.id);
    // return false
  }

  React.useEffect(() => {
    let results = [];
    fetch(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${searchTerm}?key=1d9890f5-a269-47a6-a9d7-d7f24b4ea2b7`
    )
      .then((response) => response.json())
      .then((data) => {
        data?.map((item) => {
          if (item?.meta?.id) {
            results.push({
              id: item?.meta?.uuid,
              name: item?.meta?.id,
              fl: item?.fl,
              prs: item?.hwi?.prs ? item?.hwi?.prs[0].mw : 0,
              shortdef: item?.shortdef
            });
            setSearchResults([...results]);
          } else {
            setSearchResults([...results]);
          }
        });
      });
  }, [searchTerm]);

  return (
    <div className="static">
      <div className="relative m-2.5 min-h-16 rounded-md bg-[#81bef5]">
        <h5 className="px-8 py-4 text-xl text-white">Word Keeper</h5>
        <Link to="/favorites">
          <button className="absolute inset-y-0 right-0 pr-8 text-xl text-white">
            ★ Starred Words
          </button>
        </Link>
      </div>
      <div className="flex items-start mt-5">
        <div className="flex-none relative bg-[#efefef] rounded-md h-60 w-96 m-2.5">
          <input
            className="absolute focus:outline-none focus:ring focus:border-[#81bef5] inset-x-0 top-0 mt-5 mx-4 px-5 py-4 rounded-md"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
        <div className="relative grow m-2.5">
          {searchResults?.map((item) => (
            <div key={item.id} className="relative flex flex-col gap-2">
              <div className="flex flex-row bg-white rounded-md">
                <h5
                  onClick={() => handleOpen(item)}
                  className="cursor-pointer px-8 py-4 text-xl font-bold">
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
                {isChecked(item) ? (
                  <button
                    onClick={() => handleRemoveChecked(item)}
                    className="text-[#81bef5] text-4xl">
                    ★
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddChecked(item)}
                    className="text-[#81bef5] text-4xl">
                    ☆
                  </button>
                )}
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
};

export default Dictionary;
