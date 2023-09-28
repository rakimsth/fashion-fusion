const Model = require("./product.model");

const create = (payload) => {
  return Model.create(payload);
};

const list = async (size, page, search) => {
  const pageNum = parseInt(page) || 1;
  const size = parseInt(size) || 5;
  const { name } = search;
  const query = {};
  if (name) {
    query.name = new RegExp(name, "gi");
  }
  const response = await Model.aggregate([
    {
      $match: query,
    },
    {
      $sort: {
        created_at: 1,
      },
    },
    {
      $facet: {
        metadata: [
          {
            $count: "total",
          },
        ],
        data: [
          {
            $skip: (pageNum - 1) * size,
          },
          {
            $limit: size,
          },
        ],
      },
    },
    {
      $addFields: {
        total: {
          $arrayElemAt: ["$metadata.total", 0],
        },
      },
    },
    {
      $project: {
        data: 1,
        total: 1,
      },
    },
    {
      $project: {
        "data.password": 0,
      },
    },
  ]).allowDiskUse(true);
  const newData = response[0];
  let { data, total } = newData;
  total = total || 0;
  return { data, total, limit, pageNum };
};

const getById = (id) => {
  return Model.findOne({ _id: id });
};

const updateById = (id, payload) => {
  return Model.findOneAndUpdate({ _id: id }, payload, { new: true });
};

const deleteById = (id, payload) => {
  return Model.findOneAndUpdate({ _id: id }, payload, { new: true });
};

module.exports = { create, list, getById, updateById, deleteById };
