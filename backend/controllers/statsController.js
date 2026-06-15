const SupportRequest = require('../models/SupportRequest');

// @desc    Get dashboard statistics & AI insights (Protected)
// @route   GET /api/dashboard/stats
// @access  Private (Volunteer)
const getDashboardStats = async (req, res) => {
  try {
    // Run counting in parallel
    const [
      totalRequests,
      highPriorityCount,
      mediumPriorityCount,
      lowPriorityCount,
      resolvedCount
    ] = await Promise.all([
      SupportRequest.countDocuments(),
      SupportRequest.countDocuments({ priority: 'High' }),
      SupportRequest.countDocuments({ priority: 'Medium' }),
      SupportRequest.countDocuments({ priority: 'Low' }),
      SupportRequest.countDocuments({ status: 'Resolved' })
    ]);

    // Calculate resolution percentage
    const resolutionPercentage = totalRequests > 0 
      ? Math.round((resolvedCount / totalRequests) * 100) 
      : 0;

    // Aggregate support type counts
    const supportTypeAgg = await SupportRequest.aggregate([
      {
        $group: {
          _id: '$supportType',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Format support types list
    const supportTypeCounts = {
      'Medical Consultation': 0,
      'Blood Requirement': 0,
      'Medicine Support': 0,
      'Mental Health Support': 0
    };

    supportTypeAgg.forEach(item => {
      if (item._id in supportTypeCounts) {
        supportTypeCounts[item._id] = item.count;
      }
    });

    // Determine the most requested support type
    let mostRequestedSupportType = 'None';
    let maxCount = 0;
    Object.entries(supportTypeCounts).forEach(([type, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostRequestedSupportType = type;
      }
    });

    res.json({
      totalRequests,
      highPriorityCount,
      mediumPriorityCount,
      lowPriorityCount,
      resolvedCount,
      resolutionPercentage,
      mostRequestedSupportType,
      supportTypeCounts
    });
  } catch (err) {
    console.error('Error in getDashboardStats:', err);
    res.status(500).json({ message: 'Server error while compiling dashboard statistics', error: err.message });
  }
};

module.exports = {
  getDashboardStats
};
