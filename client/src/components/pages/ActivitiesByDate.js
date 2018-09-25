import React, { Component } from "react";

class ActivitiesByDate extends Component {
  handleChange(e) {
    e.preventDefault();
    this.props.onHandleChange(e);
  }
  render() {
    let x = this.props.activities.map(a => a.date);
    return (
      <div>
        <form action="">
          {" "}
          Date
          <select name="date" onChange={e => this.handleChange(e)}>
            {x
              .filter((elem, pos, arr) => {
                return arr.indexOf(elem) === pos;
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
