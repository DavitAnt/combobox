import React, { useState } from "react";

const Combobox = ({
  data = seedData,
  placeholder = "Your text goes here ",
  disabled = true
}) => {
  const [state, setState] = useState({
    textInput: "",
    isDisabled: disabled,
    currentSuggestion: 0,
    matchedSuggestions: [],
    selectedItem: {
      valueField: "",
      textField: ""
    }
  });

  const {
    textInput,
    isDisabled,
    currentSuggestion,
    matchedSuggestions,
    selectedItem
  } = state;
  const onSelectedItemChange = (valueField, textField) => {
    setState({
      ...state,
      textInput: textField,
      currentSuggestion: 0,
      selectedItem: { valueField, textField },
      matchedSuggestions: [],
      isDisabled: true
    });
  };

  const onTextChange = e => {
    const filteredData = data.filter(item =>
      item.textField.toLowerCase().includes(e.target.value.trim().toLowerCase())
    );
    setState({
      ...state,
      matchedSuggestions: filteredData,
      textInput: e.target.value.trim(),
      isDisabled: false
    });
  };
  const onNavigation = ({ keyCode }) => {
    if (keyCode === 40 && currentSuggestion + 1 !== matchedSuggestions.length) {
      setState({ ...state, currentSuggestion: currentSuggestion + 1 });
    }
    if (keyCode === 38 && currentSuggestion !== 0) {
      setState({ ...state, currentSuggestion: currentSuggestion - 1 });
    }
    if (keyCode === 13) {
      const { valueField, textField } = matchedSuggestions[currentSuggestion];
      onSelectedItemChange(valueField, textField);
    }
  };
  const renderSuggestions = () => {
    if (matchedSuggestions.length > 0) {
      return (
        <ul className="list-group">
          {matchedSuggestions.map((suggestion, index) => (
            <li
              className={`list-group-item ${index === currentSuggestion &&
                "active"}`}
              key={suggestion.valueField}
              onMouseEnter={e => {
                e.currentTarget.classList.add("active");
              }}
              onMouseLeave={e => {
                e.currentTarget.classList.remove("active");
              }}
              onClick={() => {
                onSelectedItemChange(
                  suggestion.valueField,
                  suggestion.textField
                );
              }}
            >
              {suggestion.textField}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <div>
        <p>No suggestion matches the given input</p>
      </div>
    );
  };

  return (
    <>
      <input
        className="form-control"
        type="text"
        placeholder={placeholder}
        value={textInput}
        onChange={onTextChange}
        onKeyDown={onNavigation}
      />
      {!isDisabled && renderSuggestions()}

      <div className="card" style={{ marginTop: "20px" }}>
        <div className="card-body">
          <h5 className="card-title">Currently Selected Item:</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            valueField: {selectedItem.valueField || "nothing selected yet"}
          </h6>
          <h6 className="card-subtitle mb-2 text-muted">
            textField: {selectedItem.textField || "nothing selected yet"}
          </h6>
        </div>
      </div>
    </>
  );
};
const seedData = [
  {
    valueField: "js",
    textField: "JavaScript"
  },
  {
    valueField: "node",
    textField: "Node.js"
  },
  { valueField: "react", textField: "React.js" }
];

export default Combobox;
