module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      id: String,
      entrepreneur: String,
      pitchTitle: String,
      pitchIdea: String,
      askAmount: Number,
      equity: Number,
      offers: [],
    },
    { timestamps: false },
  );

  // eslint-disable-next-line func-names
  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Pitch = mongoose.model('pitch', schema);

  return Pitch;
};
