const db = require("../config/db");

// Admin: Create Project
exports.createProject = async (req, res) => {
  try {
    const { name, location, phone, email, startDate, endDate } = req.body;

    const project = await db.collection("projects").add({
      name,
      location,
      phone,
      email,
      startDate,
      endDate,
      createdBy: req.user.username
    });

    res.json({ message: "Project created", id: project.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Projects
exports.getProjects = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const snapshot = await db.collection("projects").get();
      const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      return res.json(projects);
    }

    // Client: only approved projects
    const requests = await db
      .collection("accessRequests")
      .where("userId", "==", req.user.username)
      .where("status", "==", "approved")
      .get();

    const projectIds = requests.docs.map(doc => doc.data().projectId);

    const projects = [];
    for (let id of projectIds) {
      const doc = await db.collection("projects").doc(id).get();
      if (doc.exists) projects.push({ id: doc.id, ...doc.data() });
    }

    res.json(projects);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};