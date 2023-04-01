import noteContext from "./noteContext";

const NoteState = (props) => {
    const state = [
        {
          "_id": "64241b8ac1fc88152e59b6df",
          "user": "6423ec99135dc74a75070113",
          "title": "hello skipper",
          "description": "wake me up when its early in morning",
          "tag": "Personal",
          "date": "2023-03-29T11:01:24.718Z",
          "__v": 0
        },
        {
          "_id": "64241b8ac1fc88152e59b6e1",
          "user": "6423ec99135dc74a75070113",
          "title": "hello skipper",
          "description": "wake me up when its early in morning",
          "tag": "Personal",
          "date": "2023-03-29T11:01:24.718Z",
          "__v": 0
        },
        {
          "_id": "64241b8ac1fc88152e59b6e3",
          "user": "6423ec99135dc74a75070113",
          "title": "hello skipper",
          "description": "wake me up when its early in morning",
          "tag": "Personal",
          "date": "2023-03-29T11:01:24.718Z",
          "__v": 0
        },
        {
          "_id": "64241b8bc1fc88152e59b6e5",
          "user": "6423ec99135dc74a75070113",
          "title": "hello skipper",
          "description": "wake me up when its early in morning",
          "tag": "Personal",
          "date": "2023-03-29T11:01:24.718Z",
          "__v": 0
        },
        {
          "_id": "64241caf47aebf2df6001c01",
          "user": "6423ec99135dc74a75070113",
          "title": "hello skipper",
          "description": "wake me up when its early in morning",
          "tag": "Personal",
          "date": "2023-03-29T11:10:34.037Z",
          "__v": 0
        },
        {
          "_id": "64241cb247aebf2df6001c03",
          "user": "6423ec99135dc74a75070113",
          "title": "hello skipper",
          "description": "wake me up when its early in morning",
          "tag": "Personal",
          "date": "2023-03-29T11:10:34.037Z",
          "__v": 0
        }
      ]
    return (
        <noteContext.Provider value={state}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;