const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// listar todas as tasks
app.get("/tasks", (req, res) => {
  db.all("SELECT * FROM tasks", (err, tasks) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(tasks);
    }
  });
});

// Adicionar uma nova task
app.post("/tasks", (req, res) => {
  const task = req.body.task;
  db.run(
    "INSERT INTO tasks (task, status) VALUES (?, ?)",
    [task, "pending"],
    function (err) {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.json({ id: this.lastID });
      }
    }
  );
});

// atualizar uma task
app.put("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const newStatus = req.body.status;
  db.run(
    "UPDATE tasks SET status = ? WHERE id = ?",
    [newStatus, taskId],
    function (err) {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.json({ changes: this.changes });
      }
    }
  );
});

// deletar uma task
app.delete("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  db.run("DELETE FROM tasks WHERE id = ?", [taskId], function (err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json({ changes: this.changes });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
