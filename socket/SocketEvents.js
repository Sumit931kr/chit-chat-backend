function onJoinRoomEvent(data, socket, io) {
  if (data.IS_NEW_ROOM) {
    // user join in new room
    socket.join(data.ROOM_CODE);
    socket.data.USER_NAME = data.USER_NAME; // Save the USER_NAME in socket.data
    socket.emit("toastEvent", `Welcome to Chit Chat ${data.USER_NAME} !`);
  } else {
    // user join in existing room
    // check if ROOM_CODE exists
    const roomExists =
      io.of("/").adapter.rooms && io.of("/").adapter.rooms.has(data.ROOM_CODE);

    if (roomExists) {
      socket.join(data.ROOM_CODE);
      socket.data.USER_NAME = data.USER_NAME; // Save the USER_NAME in socket.data
      socket
        .to(data.ROOM_CODE)
        .emit("toastEvent", `${data.USER_NAME} has Joined the Room`);
      socket.emit("toastEvent", `Welcome to Chit Chat ${data.USER_NAME} !`);
    } else {
      socket.emit(
        "errorEvent",
        `Landed NOWHERE! No ${data.ROOM_CODE} found 😑`
      );
    }
  }
}

module.exports = { onJoinRoomEvent };
