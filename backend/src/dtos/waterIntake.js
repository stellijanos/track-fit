const waterEntryDto = (data) => ({
    id: data._id,
    date: data.date,
    quantity: data.quantity,
});

const waterIntakeDto = (data) =>
    data == null
        ? null
        : {
              id: data._id,
              total: data.total,
              entries: data.entries.map(waterEntryDto),
          };

module.exports = { waterEntryDto, waterIntakeDto };
