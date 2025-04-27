const roomPhotos = {
    1: ["room1.jpg", "room1-2.jpg", "room1-3.jpg", "room1-4.jpg", "room1-5.jpg", "room1-6.jpg", "room1-7.jpg", "room1-8.jpg", "room1-9.jpg", "room1-10.jpg"],
    2: ["room2.jpg", "room2-2.jpg", "room2-3.jpg", "room2-4.jpg", "room2-5.jpg", "room2-6.jpg", "room2-7.jpg", "room2-8.jpg", "room2-9.jpg", "room2-10.jpg"],
    3: ["room3.jpg", "room3-2.jpg", "room3-3.jpg", "room3-4.jpg", "room3-5.jpg", "room3-6.jpg", "room3-7.jpg", "room3-8.jpg", "room3-9.jpg", "room3-10.jpg", "room3-11.jpg"]
  };
  
  const roomDescriptions = {
    1: "Просторий будиночок для 4-6 осіб з усім необхідним для комфортного проживання",
    2: "Просторий номер з великим балконом, розрахований на 2-4 осіб, з власною кухнею та ванною кімнатою",
    3: "Апартаменти з 2 спальнями, 2 ванними кімнатами, гостинною та великою кухнею для 6-8 осіб"
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