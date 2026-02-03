const roomPhotos = {
    1: ["room1.jpg", "room1-2.jpg", "room1-3.jpg", "room1-4.jpg", "room1-5.jpg", "room1-6.jpg", "room1-7.jpg", "room1-8.jpg", "room1-9.jpg", "room1-10.jpg"],
    2: ["room2.jpg", "room2-2.jpg", "room2-3.jpg", "room2-4.jpg", "room2-5.jpg", "room2-6.jpg", "room2-7.jpg", "room2-8.jpg", "room2-9.jpg", "room2-10.jpg"],
    3: ["room3.jpg", "room3-2.jpg", "room3-3.jpg", "room3-4.jpg", "room3-5.jpg", "room3-6.jpg", "room3-7.jpg", "room3-8.jpg", "room3-9.jpg", "room3-10.jpg", "room3-11.jpg"],
    4: ["room4.jpg", "room4-2.jpg", "room4-3.jpg", "room4-4.jpg", "room4-5.jpg", "room4-6.jpg", "room4-7.jpg", "room4-8.jpg", "room4-9.jpg", "room4-10.jpg", "room4-11.jpg", "room4-12.jpg", "room4-13.jpg", "room4-14.jpg", "room4-15.jpg", "room4-16.jpg"],
    5: ["room5.jpg", "room5-2.jpg", "room5-3.jpg", "room5-4.jpg", "room5-5.jpg", "room5-6.jpg", "room5-7.jpg", "room5-8.jpg", "room5-9.jpg", "room5-10.jpg", "room5-11.jpg", "room5-12.jpg"]
  };
  
  const roomDescriptions = {
    1: "Просторий будиночок для 4-6 осіб з усім необхідним для комфортного проживання",
    2: "Просторий номер з великим балконом, розрахований на 2-4 осіб, з власною кухнею та ванною кімнатою",
    3: "Апартаменти з 2 спальнями, 2 ванними кімнатами, великою кухнею та вітальнею",
    4: "Затишний будиночок з двома спальнями, неймовірним панорамним краєвидом прямо з вікон",
    5: "Номер, розрахований для двох людей, обляднаний всім необхідним, з неперевершеним видом на гори",
  };
  
  let currentRoom = null;
  let currentPhotoIndex = 0;
  
  function openRoom(roomNumber) {
    currentRoom = roomNumber;
    currentPhotoIndex = 0;
    updateModal();
    document.getElementById("modal").style.display = "flex";
  }
  
  function closeModal() {
    document.getElementById("modal").style.display = "none";
  }
  
  function updateModal() {
    const modalImg = document.getElementById("modal-img");
    const caption = document.getElementById("caption");
    modalImg.src = roomPhotos[currentRoom][currentPhotoIndex];
    caption.innerHTML = roomDescriptions[currentRoom];
  }
  
  function nextPhoto() {
    if (currentRoom !== null) {
      currentPhotoIndex = (currentPhotoIndex + 1) % roomPhotos[currentRoom].length;
      updateModal();
    }
  }
  
  function prevPhoto() {
    if (currentRoom !== null) {
      currentPhotoIndex = (currentPhotoIndex - 1 + roomPhotos[currentRoom].length) % roomPhotos[currentRoom].length;
      updateModal();
    }
  }
  
  function backgroundClick(event) {
    if (event.target.id === "modal") {
      closeModal();
    }
  }
