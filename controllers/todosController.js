import Todo from '../models/Todo.js';

export const getToDos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user });
    res.status(200).json({ msg: 'ToDo Found', todos });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ errors: 'Internal server error' });
  }
};

export const getToDo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ msg: 'Todo Not Found' });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    res.status(200).json({ msg: 'Todo Found', todo });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ errors: 'Internal Server Error' });
  }
};



export const createToDo = async (req, res) => {
  const { title, description } = req.body;

  try {
    const newTodo = new Todo({
      title,
      description,
      completed: false,
      user: req.user,
    });

    const todo = await newTodo.save();

    res.status(201).json({ msg: 'Todo Created', todo });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ errors: 'Internal Server Error' });
  }
};

export const deleteToDo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ msg: 'Todo Not Found' });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    await Todo.findByIdAndDelete(id);

    res.status(200).json({ msg: 'Todo Deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ errors: 'Internal Server Error' });
  }
};

export const updateToDo = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    let todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ msg: 'Todo Not Found' });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    todo = await Todo.findByIdAndUpdate(
      id,
      { $set: { title, description, completed } },
      { new: true }
    );

    res.status(200).json({ msg: 'Todo Updated', todo });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ errors: 'Internal Server Error' });
  }
};
