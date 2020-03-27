import React, { Component } from "react";
import "./item-status-filter.css";

export default class ItemStatusFilter extends Component {
    filters = ["all", "done", "active"];

    render() {
        const { currentFilter, onChangeFilter } = this.props;
        const elements = this.filters.map(filter => {
            const classNames =
                filter === currentFilter
                    ? "btn_filter btn_filter_active"
                    : "btn_filter";

            return (
                <button
                    key={filter}
                    id={filter}
                    type="button"
                    className={classNames}
                    onClick={e => onChangeFilter(e.targer)}
                >
                    {filter}
                </button>
            );
        });
        return <div className="btn-group item-status-filter">{elements}</div>;
    }
}
