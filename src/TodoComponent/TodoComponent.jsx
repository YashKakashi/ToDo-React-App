import React from "react";
import "../bootstrap-4.6.0-dist/css/bootstrap.min.css";

class TodoComponent extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            list: [
                {
                    id: 1,
                    title: "Test1",
                    date: new Date().toLocaleDateString(),
                    isCompleted: false
                },
                {
                    id: 2,
                    title: "Test2",
                    date: new Date().toLocaleDateString(),
                    isCompleted: false
                },
                {
                    id: 3,
                    title: "Test3",
                    date: new Date().toLocaleDateString(),
                    isCompleted: false
                }
            ],
            title: ""
        }
    }

    OnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    OnDeleteItem = (e) => {
        let id = parseInt(e.target.name.split("_")[1]);
        let newList = this.state.list.filter(item => item.id !== id);
        this.setState({list: newList});
    }

    OnComplete = (e) => {
        let id = parseInt(e.target.name.split("_")[1]);
        let oldList = this.state.list;
        let targetItem = this.state.list.filter(item => item.id === id);
        
        if (targetItem.length === 1) {
            targetItem[0].isCompleted = true;
            targetItem[0].title += " @Completed";
            oldList.forEach(item => item.id === id?targetItem[0]:item);
            this.setState({list: oldList})
        } else
            alert("Something went wrong :(");
    }

    OnSubmit = (e) => {
        e.preventDefault();

        let newItem = {
            id: this.state.list[this.state.list.length - 1].id + 1,
            title: this.state.title,
            date: new Date().toLocaleDateString(),
            isCompleted: false
        }

        this.setState({
            list: this.state.list.concat(newItem),
        });

        this.setState({
            title: ""
        });
    }

    render() {
        return (
            <div className="container-fluid">
                {/* Add Todo Item */}
                <div className="container bg-light shadow-lg rounded mt-5 mb-4 p-2">
                    <form onSubmit={this.OnSubmit}>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" onChange={this.OnChange} value={this.state.title}/>
                        <input type="submit" className="btn btn-primary" value="Add Todo Item" />
                    </form>
                </div>
                {/* Todo List */}

                <div className="container bg-light shadow-lg rounded mt-2 mb-4 p-2">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Date</th>
                                <th>isCompleted</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.list.map(item => 
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.date}</td>
                                <td>
                                    {!item.isCompleted?<button className="btn btn-success" name={"complete_" + item.id} onClick={this.OnComplete}>Complete</button>:""}
                                    <button className="btn btn-danger" name={"delete_" + item.id} onClick={this.OnDeleteItem}>Delete</button>
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default TodoComponent;