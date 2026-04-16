const db = require("../config/db");

// Client: Request Access
exports.requestAccess = async (req, res) => {
  try {
    const { projectId } = req.body;

    await db.collection("accessRequests").add({
      userId: req.user.username,
      projectId,
      status: "pending"
    });

    res.json({ message: "Request sent" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: Approve
exports.approveRequest = async (req, res) => {
  const { requestId } = req.body;

  await db.collection("accessRequests").doc(requestId).update({
    status: "approved"
  });

  res.json({ message: "Approved" });
};

// Admin: Deny
exports.denyRequest = async (req, res) => {
  const { requestId } = req.body;

  await db.collection("accessRequests").doc(requestId).update({
    status: "denied"
  });

  res.json({ message: "Denied" });
};

// Admin: Get all requests
exports.getRequests = async (req, res) => {
  const snapshot = await db.collection("accessRequests").get();

  const data = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  res.json(data);
};