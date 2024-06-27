// // firebaseHelper.js

const getCurrentUserNamesFromFirebase = async () => {
  // Burada Firebase ile kullanıcı adlarını çekmek için gerekli kodları yazın
  // Örneğin:
  // const usersSnapshot = await firebase.firestore().collection('users').get();
  // return usersSnapshot.docs.map(doc => doc.data().name);

  // Geçici olarak statik kullanıcı adları dönelim:
  return [
    { id: 1, first_name: "İrem" },
    { id: 2, first_name: "Elif" },
    { id: 3, first_name: "Gül" },
    { id: 4, first_name: "Meri" },
    { id: 5, first_name: "İlge" },
    { id: 6, first_name: "Gülfer" },
    { id: 7, first_name: "Elife" },
    { id: 8, first_name: "Elgün" },
    { id: 9, first_name: "EfGül" },
    { id: 10, first_name: "İmren" },
  ];
};

export { getCurrentUserNamesFromFirebase };
