module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      investor: String,
      amount: Number,
      equity: Number,
      comment: String,
    },
    { timestamps: false },
  );

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Investor = mongoose.model('investor', schema);

  return Investor;
};
