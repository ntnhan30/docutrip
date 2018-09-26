import React, { Component } from "react";

class ActivitiesByDate extends Component {
  constructor(props) {
    super(props);
  }

  handleChange(e) {
    e.preventDefault();
    this.props.onChange(e);
  }

  render() {
    return (
      <div>
        <form action="">
          {" "}
          <img src="/calendar.svg" className="Star-logo" alt="" />
          <select name="date" onChange={e => this.handleChange(e)}>
            <option value="">All</option>
            {this.props.activities
              .map(a => a.date.toString().substring(0, 10))
              .filter((elem, pos, arr) => {
                return arr.indexOf(elem) == pos;
              })
              .map(a => {
                return (
                  <option value={a.toString().substring(0, 10)}>
                    {a.toString().substring(0, 10)}
                  </option>
                );
              })}
          </select>
        </form>
      </div>
    );
  }
}

export default ActivitiesByDate;
