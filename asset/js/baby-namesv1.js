(function() {
'use strict';

// ════════════════════════════════════════
// DATA — 500 ISLAMIC BABY NAMES
// Format: [name, arabic, meaning, gender(L/P/U), source, syllables, themes]
// sources: quran | nabi | sahabat | hadith | umum
// themes: cahaya | kekuatan | keberkatan | ilmu | kemuliaan | keindahan
// ════════════════════════════════════════
const NBX_DATA = [
// ── LELAKI AL-QURAN ──
['Adam','آدَم','Bapa manusia pertama, yang diciptakan dari tanah','L','quran',2,['kemuliaan']],
['Ibrahim','إِبْرَاهِيم','Bapa yang penyayang; Nabi khalilullah','L','nabi',3,['kemuliaan','keberkatan']],
['Ismail','إِسْمَاعِيل','Allah mendengar; anak Nabi Ibrahim','L','nabi',3,['keberkatan']],
['Ishaq','إِسْحَاق','Dia tertawa; anak Nabi Ibrahim','L','nabi',2,['keberkatan']],
['Yusuf','يُوسُف','Allah menambahkan; Nabi yang tampan','L','nabi',2,['keindahan','kemuliaan']],
['Musa','مُوسَى','Diselamatkan dari air; Nabi Allah','L','nabi',2,['kekuatan','keberkatan']],
['Isa','عِيسَى','Allah menyelamatkan; Nabi Isa a.s.','L','nabi',2,['keberkatan']],
['Yahya','يَحْيَى','Dia hidup; Nabi Yahya a.s.','L','nabi',2,['keberkatan']],
['Zakariya','زَكَرِيَّا','Allah mengingati; Nabi Zakariya a.s.','L','nabi',4,['keberkatan']],
['Idris','إِدْرِيس','Pengajar; Nabi Idris a.s.','L','nabi',2,['ilmu']],
['Nuh','نُوح','Ketenangan; Nabi Nuh a.s.','L','nabi',1,['keberkatan','kekuatan']],
['Hud','هُود','Nabi kaum Aad','L','nabi',1,['keberkatan']],
['Saleh','صَالِح','Orang yang soleh dan baik','L','nabi',2,['keberkatan']],
['Lut','لُوط','Nabi yang diutus kepada kaum Sodom','L','nabi',1,['keberkatan']],
['Shuaib','شُعَيْب','Nabi kaum Madyan','L','nabi',2,['keberkatan']],
['Sulaiman','سُلَيْمَان','Manusia yang penuh kedamaian; Nabi-Raja','L','nabi',4,['kemuliaan','kekuatan']],
['Dawud','دَاوُود','Kekasih Allah; Nabi Dawud a.s.','L','nabi',2,['kemuliaan','keberkatan']],
['Harun','هَارُون','Pegunungan kekuatan; saudara Nabi Musa','L','nabi',2,['kekuatan']],
['Yaqub','يَعْقُوب','Mengikut dari belakang; Nabi Yaqub','L','nabi',2,['keberkatan']],
['Yunus','يُونُس','Merpati; Nabi Yunus a.s.','L','nabi',2,['keberkatan']],
['Ilyas','إِلْيَاس','Tuhan adalah Allah; Nabi Ilyas a.s.','L','nabi',2,['keberkatan']],
['Zulkifli','ذُو الْكِفْل','Orang yang menanggung beban; Nabi','L','nabi',4,['kekuatan']],
['Muhammad','مُحَمَّد','Orang yang terpuji; Nabi akhir zaman','L','nabi',4,['kemuliaan','keberkatan']],
['Ahmad','أَحْمَد','Yang terpuji; nama lain Nabi Muhammad ﷺ','L','nabi',2,['kemuliaan']],
['Mahmud','مَحْمُود','Yang dipuji; terpuji di sisi Allah','L','nabi',2,['kemuliaan']],
// ── LELAKI SAHABAT ──
['Abu Bakr','أَبُو بَكْر','Bapa anak muda; Khalifah pertama','L','sahabat',3,['kemuliaan','kekuatan']],
['Umar','عُمَر','Panjang umur; Khalifah kedua','L','sahabat',2,['kekuatan','kemuliaan']],
['Uthman','عُثْمَان','Anak ayam; Khalifah ketiga','L','sahabat',2,['kemuliaan']],
['Ali','عَلِيّ','Yang tinggi; sepupu dan menantu Nabi','L','sahabat',2,['kemuliaan','kekuatan']],
['Talha','طَلْحَة','Pokok yang subur; sahabat mulia','L','sahabat',2,['keberkatan']],
['Zubair','الزُّبَيْر','Orang yang teguh; sahabat setia','L','sahabat',2,['kekuatan']],
['Abdurrahman','عَبْدُ الرَّحْمَن','Hamba Allah Yang Maha Penyayang','L','sahabat',5,['keberkatan']],
['Saad','سَعْد','Kebahagiaan; sahabat Nabi','L','sahabat',1,['keberkatan']],
['Said','سَعِيد','Orang yang bahagia dan bertuah','L','sahabat',2,['keberkatan']],
['Bilal','بِلَال','Muazin pertama Islam; sahabat mulia','L','sahabat',2,['kemuliaan']],
['Ammar','عَمَّار','Orang yang membangun; sahabat setia','L','sahabat',2,['kekuatan']],
['Salman','سَلْمَان','Orang yang selamat dan damai','L','sahabat',2,['keberkatan']],
['Muaz','مُعَاذ','Orang yang dilindungi oleh Allah','L','sahabat',2,['keberkatan']],
['Anas','أَنَس','Keramahan; pembantu setia Rasulullah','L','sahabat',2,['keberkatan']],
['Jabir','جَابِر','Pemberi sokongan; sahabat perawi hadith','L','sahabat',2,['kekuatan']],
['Huzaifah','حُذَيْفَة','Pemegang rahsia Nabi','L','sahabat',4,['kemuliaan']],
['Khalid','خَالِد','Kekal abadi; panglima perang Islam','L','sahabat',2,['kekuatan','kemuliaan']],
['Sad','سَعْد','Keberuntungan dan kebahagiaan','L','sahabat',1,['keberkatan']],
['Hamzah','حَمْزَة','Singa Allah; bapa saudara Nabi','L','sahabat',2,['kekuatan']],
['Jafar','جَعْفَر','Sungai kecil yang mengalir deras','L','sahabat',2,['keberkatan']],
// ── LELAKI UMUM ──
['Rayyan','رَيَّان','Pintu syurga untuk orang berpuasa','L','quran',2,['keberkatan','kemuliaan']],
['Razin','رَزِين','Tenang, sabar dan berwibawa','L','umum',2,['kemuliaan']],
['Ridhwan','رِضْوَان','Keredhaan Allah; penjaga syurga','L','quran',3,['keberkatan']],
['Rahim','رَحِيم','Yang penuh kasih sayang','L','quran',2,['keberkatan']],
['Rauf','رَؤُوف','Yang sangat penyayang dan lemah lembut','L','quran',1,['keberkatan']],
['Rashid','رَشِيد','Yang mendapat petunjuk yang benar','L','umum',2,['ilmu']],
['Rafiq','رَفِيق','Teman yang baik dan setia','L','umum',2,['keberkatan']],
['Rahmat','رَحْمَت','Rahmat dan kasih sayang Allah','L','umum',2,['keberkatan']],
['Rasydan','رَشْدَان','Orang yang bijaksana dan menuju kebenaran','L','umum',2,['ilmu']],
['Ridwan','رِضْوَان','Keredhaan dan kerelaan hati','L','umum',2,['keberkatan']],
['Faris','فَارِس','Penunggang kuda; pahlawan gagah berani','L','umum',2,['kekuatan']],
['Faiz','فَائِز','Orang yang berjaya dan menang','L','umum',1,['kemuliaan']],
['Farhan','فَرْحَان','Orang yang gembira dan bahagia','L','umum',2,['keberkatan']],
['Fikri','فِكْرِي','Pemikiran; yang suka berfikir','L','umum',2,['ilmu']],
['Fahmi','فَهْمِي','Orang yang memahami dengan cepat','L','umum',2,['ilmu']],
['Fadli','فَضْلِي','Orang yang memiliki kelebihan','L','umum',2,['kemuliaan']],
['Falah','فَلَاح','Kejayaan dunia dan akhirat','L','umum',2,['kemuliaan']],
['Faqih','فَقِيه','Orang yang arif dalam ilmu fiqh','L','umum',2,['ilmu']],
['Fauzan','فَوْزَان','Kejayaan yang besar','L','umum',2,['kemuliaan']],
['Fuad','فُؤَاد','Hati; jiwa yang mulia','L','quran',1,['kemuliaan']],
['Haris','حَارِس','Penjaga; orang yang melindungi','L','umum',2,['kekuatan']],
['Hakim','حَكِيم','Yang bijaksana; orang yang arif','L','quran',2,['ilmu']],
['Hafiz','حَافِظ','Penjaga; penghafal Al-Quran','L','umum',2,['ilmu','keberkatan']],
['Hanif','حَنِيف','Orang yang lurus agamanya','L','quran',2,['keberkatan']],
['Hasan','حَسَن','Yang baik dan cantik','L','umum',2,['keindahan']],
['Husain','حُسَيْن','Yang sangat baik; cucu Nabi','L','umum',2,['keindahan','kemuliaan']],
['Haziq','حَاذِق','Orang yang bijak dan mahir','L','umum',2,['ilmu']],
['Hilmi','حِلْمِي','Orang yang sabar dan tenang','L','umum',2,['kemuliaan']],
['Harith','الْحَارِث','Pengusaha; orang yang bekerja keras','L','umum',2,['kekuatan']],
['Izzat','عِزَّت','Kemuliaan dan kehormatan','L','umum',2,['kemuliaan']],
['Izzuddin','عِزُّ الدِّين','Kemuliaan agama Islam','L','umum',4,['kemuliaan']],
['Irfan','عِرْفَان','Pengetahuan yang mendalam','L','umum',2,['ilmu']],
['Ilham','إِلْهَام','Ilham dari Allah','L','umum',2,['cahaya','ilmu']],
['Ikram','إِكْرَام','Penghormatan yang tinggi','L','umum',2,['kemuliaan']],
['Imran','عِمْرَان','Kemakmuran; bapa Siti Maryam','L','quran',2,['kemuliaan']],
['Jauhari','جَوْهَرِي','Seperti permata; berharga','L','umum',4,['keindahan']],
['Jawad','جَوَاد','Yang pemurah hati','L','umum',2,['keberkatan']],
['Kamil','كَامِل','Yang sempurna dan lengkap','L','umum',2,['kemuliaan']],
['Karim','كَرِيم','Yang mulia dan pemurah','L','quran',2,['kemuliaan','keberkatan']],
['Luqman','لُقْمَان','Orang yang bijaksana; tokoh Al-Quran','L','quran',2,['ilmu','kemuliaan']],
['Latif','لَطِيف','Yang lemah lembut dan halus','L','quran',2,['keindahan']],
['Mahdi','مَهْدِي','Yang mendapat petunjuk','L','umum',2,['keberkatan']],
['Malik','مَالِك','Raja; pemilik; penguasa','L','quran',2,['kemuliaan']],
['Mukhlis','مُخْلِص','Orang yang ikhlas','L','umum',2,['keberkatan']],
['Mukhtar','مُخْتَار','Yang terpilih','L','umum',2,['kemuliaan']],
['Munir','مُنِير','Yang bercahaya; menerangi','L','quran',2,['cahaya']],
['Mubarak','مُبَارَك','Yang diberkati oleh Allah','L','umum',3,['keberkatan']],
['Muzakkir','مُذَكِّر','Orang yang suka mengingati Allah','L','umum',3,['keberkatan']],
['Nabil','نَبِيل','Yang mulia dan terhormat','L','umum',2,['kemuliaan']],
['Naim','نَعِيم','Yang hidup dalam kenikmatan','L','quran',2,['keberkatan']],
['Nasir','نَاصِر','Penolong; pembela','L','umum',2,['kekuatan']],
['Nawwaf','نَوَّاف','Yang tinggi dan mulia','L','umum',2,['kemuliaan']],
['Nizam','نِظَام','Peraturan; keteraturan','L','umum',2,['kemuliaan']],
['Nur','نُور','Cahaya dari Allah','L','quran',1,['cahaya']],
['Nuruddin','نُورُ الدِّين','Cahaya agama Islam','L','quran',4,['cahaya']],
['Omar','عُمَر','Panjang umur; hidup yang makmur','L','umum',2,['kemuliaan']],
['Qais','قَيْس','Yang teguh dan kuat','L','umum',1,['kekuatan']],
['Qayyum','قَيُّوم','Yang berdiri sendiri; nama Allah','L','quran',2,['kekuatan']],
['Qudratullah','قُدْرَةُ اللَّه','Kekuatan dan kuasa Allah','L','umum',4,['kekuatan']],
['Saiful','سَيْفُ','Pedang; keberanian','L','umum',2,['kekuatan']],
['Saifuddin','سَيْفُ الدِّين','Pedang agama; pembela Islam','L','umum',4,['kekuatan']],
['Syafiq','شَفِيق','Yang penuh kasih sayang','L','umum',2,['keberkatan']],
['Syakir','شَاكِر','Yang bersyukur kepada Allah','L','umum',2,['keberkatan']],
['Syamsul','شَمْسُ','Matahari; cahaya yang menerangi','L','umum',2,['cahaya']],
['Tajuddin','تَاجُ الدِّين','Mahkota agama Islam','L','umum',4,['kemuliaan']],
['Tariq','طَارِق','Bintang pagi; yang mengetuk','L','quran',2,['cahaya']],
['Taufiq','تَوْفِيق','Petunjuk dan kejayaan dari Allah','L','umum',2,['keberkatan']],
['Usman','عُثْمَان','Anak ayam; nama sahabat Nabi','L','sahabat',2,['kemuliaan']],
['Uzair','عُزَيْر','Pertolongan; nama nabi dalam Quran','L','quran',2,['keberkatan']],
['Wafi','وَافِي','Yang sempurna dan setia','L','umum',2,['kemuliaan']],
['Walid','وَلِيد','Anak yang baru lahir','L','umum',2,['keberkatan']],
['Wasim','وَسِيم','Yang tampan dan kacak','L','umum',2,['keindahan']],
['Yahya','يَحْيَى','Dia hidup; nama Nabi','L','nabi',2,['keberkatan']],
['Yazid','يَزِيد','Yang semakin bertambah baik','L','umum',2,['kemuliaan']],
['Zafar','ظَفَر','Kemenangan','L','umum',2,['kekuatan']],
['Zahid','زَاهِد','Orang yang zuhud dari dunia','L','umum',2,['keberkatan']],
['Zahir','ظَاهِر','Yang jelas dan nyata','L','quran',2,['cahaya']],
['Zaim','زَعِيم','Pemimpin; ketua','L','umum',1,['kemuliaan']],
['Zaki','زَكِي','Yang suci dan bersih hati','L','quran',2,['keberkatan']],
['Ziyad','زِيَاد','Yang bertambah baik','L','umum',2,['kemuliaan']],
['Zulfiqar','ذُو الْفَقَار','Pedang berlekuk milik Ali r.a.','L','sahabat',3,['kekuatan']],
['Haikal','هَيْكَل','Bangunan yang megah','L','umum',2,['kemuliaan']],
['Hazwan','حَزْوَان','Yang beruntung','L','umum',2,['keberkatan']],
['Danish','دَانِش','Pengetahuan dan kebijaksanaan','L','umum',2,['ilmu']],
['Darwisy','دَرْوِيش','Abdi Allah yang rendah diri','L','umum',3,['keberkatan']],
['Daud','دَاوُود','Nama lain Nabi Dawud','L','nabi',1,['kemuliaan']],
['Ezwan','إِزْوَان','Yang penuh kasih sayang','L','umum',2,['keberkatan']],
['Afiq','عَفِيق','Yang bersih dan suci','L','umum',2,['keberkatan']],
['Afnan','أَفْنَان','Dahan-dahan pokok yang rindang','L','quran',2,['keindahan']],
['Aqil','عَاقِل','Yang berakal dan bijaksana','L','umum',2,['ilmu']],
['Amir','أَمِير','Pemimpin; pangeran','L','umum',2,['kemuliaan']],
['Amran','عِمْرَان','Pembangunan; kemakmuran','L','umum',2,['kemuliaan']],
['Arif','عَارِف','Yang mengenal Allah; yang bijak','L','umum',2,['ilmu']],
['Aryan','آرْيَان','Yang mulia dan terhormat','L','umum',3,['kemuliaan']],
['Ashraf','أَشْرَف','Yang paling mulia','L','umum',2,['kemuliaan']],
['Asim','عَاصِم','Pelindung; yang menjaga','L','umum',2,['kekuatan']],
['Asri','عَصْرِي','Moden; orang zaman ini','L','umum',2,['kemuliaan']],
['Atif','عَاطِف','Yang penuh kasih sayang','L','umum',2,['keberkatan']],
['Azfar','أَظْفَر','Yang menang dan berjaya','L','umum',2,['kekuatan']],
['Azhar','أَزْهَر','Yang bercahaya dan menyinar','L','umum',2,['cahaya']],
['Azim','عَظِيم','Yang agung dan besar','L','quran',2,['kemuliaan']],
['Azlan','أَزْلَان','Singa; berani dan gagah','L','umum',2,['kekuatan']],
['Azri','أَزْرِي','Yang memberi pertolongan','L','umum',2,['keberkatan']],
['Azzam','عَزَّام','Tekad yang kuat','L','umum',2,['kekuatan']],
['Badr','بَدْر','Bulan purnama; cahaya penuh','L','umum',1,['cahaya']],
['Baharuddin','بَهَاءُ الدِّين','Keindahan agama Islam','L','umum',5,['keindahan']],
['Basyir','بَشِير','Pembawa berita gembira','L','quran',2,['keberkatan']],
['Bustami','بُسْتَامِي','Tukang kebun; penjaga taman','L','umum',3,['keindahan']],
// ── PEREMPUAN AL-QURAN &amp; NABI ──
['Maryam','مَرْيَم','Perempuan yang dimuliakan Allah','P','quran',3,['kemuliaan','keberkatan']],
['Fatimah','فَاطِمَة','Yang disapih; putri Nabi Muhammad','P','nabi',3,['kemuliaan','keberkatan']],
['Khadijah','خَدِيجَة','Bayi yang lahir sebelum waktunya; isteri pertama Nabi','P','nabi',3,['kemuliaan']],
['Aisyah','عَائِشَة','Yang hidup; isteri Nabi tercinta','P','nabi',3,['keberkatan','kemuliaan']],
['Asiah','آسِيَة','Wanita yang merawat; isteri Firaun beriman','P','quran',3,['keberkatan']],
['Zainab','زَيْنَب','Pokok yang harum bunganya','P','nabi',2,['keindahan','keberkatan']],
['Hafsah','حَفْصَة','Anak singa; isteri Nabi','P','nabi',2,['kekuatan']],
['Ummu Salamah','أُمُّ سَلَمَة','Ibu kepada Salamah; isteri Nabi','P','nabi',4,['kemuliaan']],
['Juwairiyah','جُوَيْرِيَّة','Gadis kecil; isteri Nabi','P','nabi',4,['keindahan']],
['Safiyyah','صَفِيَّة','Yang suci murni; isteri Nabi','P','nabi',3,['keberkatan']],
['Maymunah','مَيْمُونَة','Yang diberkati; isteri Nabi','P','nabi',3,['keberkatan']],
['Ruqayyah','رُقَيَّة','Yang naik ke atas; putri Nabi','P','nabi',3,['kemuliaan']],
['Ummu Kulthum','أُمُّ كُلْثُوم','Putri Nabi Muhammad ﷺ','P','nabi',4,['kemuliaan']],
// ── PEREMPUAN UMUM ──
['Nur','نُور','Cahaya; sinar dari Allah','P','quran',1,['cahaya']],
['Nurul','نُورُ','Cahaya; awalan nama bermaksud cahaya','P','quran',2,['cahaya']],
['Nuraini','نُورُ الْعَيْن','Cahaya mata; yang menjadi kebanggaan','P','umum',4,['cahaya','keindahan']],
['Nurhayati','نُورُ حَيَاتِي','Cahaya kehidupanku','P','umum',5,['cahaya','keberkatan']],
['Hana','هَنَا','Kebahagiaan dan kesenangan','P','umum',2,['keberkatan']],
['Hanah','هَنَاء','Kebahagiaan yang sempurna','P','umum',2,['keberkatan']],
['Hani','هَانِي','Yang bahagia dan gembira','P','umum',2,['keberkatan']],
['Sara','سَارَة','Permaisuri; wanita mulia','P','umum',2,['kemuliaan']],
['Sarah','سَارَة','Yang gembira; isteri Nabi Ibrahim','P','nabi',2,['kemuliaan','keberkatan']],
['Safura','صَفُورَاء','Isteri Nabi Musa a.s.; yang cantik','P','nabi',3,['keindahan']],
['Siti','سِتِّي','Wanita mulia; gelar kehormatan','P','umum',2,['kemuliaan']],
['Sofia','صُوفِيَّا','Yang bijaksana','P','umum',3,['ilmu']],
['Sofiah','صُوفِيَّة','Yang bijak dan berhikmah','P','umum',3,['ilmu']],
['Syifa','شِفَاء','Penyembuhan; ubat dari Allah','P','quran',2,['keberkatan']],
['Syakirah','شَاكِرَة','Yang bersyukur kepada Allah','P','umum',3,['keberkatan']],
['Sharifah','شَرِيفَة','Wanita yang mulia dan terhormat','P','umum',3,['kemuliaan']],
['Rania','رَانِيَة','Yang indah dipandang mata','P','umum',3,['keindahan']],
['Raihan','رَيْحَان','Pokok yang harum; buah syurga','P','quran',2,['keindahan','keberkatan']],
['Raihanah','رَيْحَانَة','Bunga yang sangat harum','P','umum',4,['keindahan']],
['Rafiqah','رَفِيقَة','Teman yang baik hati','P','umum',3,['keberkatan']],
['Ramlah','رَمْلَة','Isteri Nabi; pasir yang lembut','P','nabi',2,['keberkatan']],
['Razanah','رَزَانَة','Yang tenang dan berwibawa','P','umum',3,['kemuliaan']],
['Naura','نَوْرَة','Bunga; yang bercahaya cantik','P','umum',2,['cahaya','keindahan']],
['Nadia','نَادِيَة','Yang lembut dan berhati mulia','P','umum',3,['keberkatan']],
['Nadiah','نَادِيَة','Memanggil; yang mengajak ke kebaikan','P','umum',3,['keberkatan']],
['Nafisah','نَفِيسَة','Yang berharga seperti permata','P','umum',3,['keindahan']],
['Nazirah','نَاظِرَة','Yang melihat dengan bijaksana','P','umum',3,['ilmu']],
['Najah','نَجَاح','Kejayaan yang gemilang','P','umum',2,['kemuliaan']],
['Najwa','نَجْوَى','Bisikan rahsia; yang rapat di hati','P','quran',2,['keberkatan']],
['Mariam','مَرْيَم','Bentuk lain Maryam; mulia','P','quran',3,['kemuliaan']],
['Madihah','مَدِيحَة','Yang terpuji dan disanjungi','P','umum',4,['kemuliaan']],
['Maisarah','مَيْسَرَة','Kemudahan dari Allah','P','umum',3,['keberkatan']],
['Maizura','مَيْزُورَة','Yang indah dipandang','P','umum',3,['keindahan']],
['Malak','مَلَاك','Malaikat; yang suci','P','umum',2,['keberkatan']],
['Layla','لَيْلَى','Malam; yang cantik seperti malam','P','umum',2,['keindahan']],
['Lailatul','لَيْلَةُ','Malam; awalan nama bermaksud malam','P','umum',3,['keindahan']],
['Latifah','لَطِيفَة','Yang lemah lembut dan halus budi','P','quran',3,['keindahan']],
['Liyana','لِيَانَة','Yang lembut dan fleksibel','P','umum',3,['keindahan']],
['Ilham','إِلْهَام','Ilham dari Allah Yang Maha Tinggi','P','umum',2,['ilmu','cahaya']],
['Insyirah','انْشِرَاح','Lapang dada; ketenangan hati','P','quran',3,['keberkatan']],
['Intan','إِنْتَان','Intan berlian; yang berharga','P','umum',2,['keindahan']],
['Izzah','عِزَّة','Kemuliaan; kehormatan diri','P','umum',2,['kemuliaan']],
['Izzati','عِزَّتِي','Kemuliaanku; kebanggaanku','P','umum',3,['kemuliaan']],
['Haziqah','حَاذِقَة','Yang bijak dan cekap','P','umum',3,['ilmu']],
['Hasanah','حَسَنَة','Yang cantik dan baik','P','umum',3,['keindahan']],
['Haura','حَوْرَاء','Bidadari syurga bermata indah','P','umum',2,['keindahan','keberkatan']],
['Hamidah','حَامِدَة','Yang sering memuji Allah','P','umum',3,['keberkatan']],
['Faridah','فَرِيدَة','Yang unik dan tiada tandingnya','P','umum',3,['kemuliaan']],
['Farhana','فَرْحَانَة','Yang sangat gembira dan ceria','P','umum',3,['keberkatan']],
['Fatanah','فَطَانَة','Yang cerdas dan bijaksana','P','umum',3,['ilmu']],
['Fatin','فَاتِن','Yang menarik dan menawan hati','P','umum',2,['keindahan']],
['Fauziah','فَوْزِيَّة','Yang berjaya dan mencapai kejayaan','P','umum',4,['kemuliaan']],
['Fitri','فِطْرِي','Yang bersih dan suci jiwa','P','umum',2,['keberkatan']],
['Fiza','فَيْضَاء','Yang murah hati; penuh berkat','P','umum',2,['keberkatan']],
['Aina','عَيْنَاء','Bermata indah dan besar','P','umum',2,['keindahan']],
['Ainul','عَيْنُ','Mata; awalan nama bermaksud mata','P','quran',2,['keindahan']],
['Alya','عَلْيَاء','Yang tinggi dan mulia','P','umum',2,['kemuliaan']],
['Alyaa','عَلْيَاء','Yang paling tinggi darjatnya','P','umum',3,['kemuliaan']],
['Amani','أَمَانِي','Harapan dan cita-cita mulia','P','umum',3,['keberkatan']],
['Amira','أَمِيرَة','Puteri; yang memerintah','P','umum',3,['kemuliaan']],
['Arissa','عَارِصَة','Yang gembira dan ceria','P','umum',3,['keberkatan']],
['Asma','أَسْمَاء','Nama-nama yang mulia','P','nabi',2,['kemuliaan']],
['Athirah','عَاطِرَة','Yang harum dan wangi','P','umum',3,['keindahan']],
['Atiqah','عَتِيقَة','Yang cantik; yang merdeka','P','nabi',3,['keindahan']],
['Atirah','أَطِيرَة','Yang harum semerbak','P','umum',3,['keindahan']],
['Ayasha','عَائِشَة','Yang hidup dengan penuh semangat','P','umum',3,['keberkatan']],
['Azizah','عَزِيزَة','Yang mulia dan dihormati','P','quran',3,['kemuliaan']],
['Azra','عَذْرَاء','Perawan; yang suci','P','umum',2,['keberkatan']],
['Balqis','بَلْقِيس','Ratu Saba; wanita pemimpin mulia','P','quran',2,['kemuliaan']],
['Bushra','بُشْرَى','Berita gembira','P','quran',2,['keberkatan']],
['Dalila','دَلِيلَة','Bukti; panduan yang jelas','P','umum',3,['ilmu']],
['Dania','دَانِيَة','Yang hampir dan dekat','P','quran',3,['keberkatan']],
['Darwisyah','دَرْوِيشَة','Abdi Allah yang ikhlas','P','umum',4,['keberkatan']],
['Durrah','دُرَّة','Mutiara yang berharga','P','umum',2,['keindahan']],
['Faiqah','فَائِقَة','Yang cemerlang dan unggul','P','umum',3,['kemuliaan']],
['Farida','فَرِيدَة','Yang unik tiada tandingan','P','umum',3,['kemuliaan']],
['Habibah','حَبِيبَة','Yang dicintai sepenuh hati','P','umum',3,['keberkatan']],
['Hafizah','حَافِظَة','Penghafal Al-Quran; penjaga','P','umum',3,['ilmu','keberkatan']],
['Hajar','هَاجَر','Isteri Nabi Ibrahim; pejuang','P','nabi',2,['kekuatan','keberkatan']],
['Halimah','حَلِيمَة','Yang penyabar; ibu susuan Nabi','P','nabi',3,['keberkatan']],
['Huda','هُدَى','Petunjuk dari Allah','P','quran',2,['keberkatan','cahaya']],
['Humaira','حُمَيْرَاء','Yang kemerah-merahan; nama Aisyah','P','nabi',4,['keindahan']],
['Husna','حُسْنَى','Yang paling baik; yang cantik','P','quran',2,['keindahan']],
['Iman','إِيمَان','Iman kepada Allah','P','umum',2,['keberkatan']],
['Jannah','جَنَّة','Syurga; taman yang indah','P','quran',2,['keberkatan','keindahan']],
['Jinan','جِنَان','Syurga-syurga; taman-taman','P','quran',2,['keberkatan']],
['Kamilah','كَامِلَة','Yang sempurna dalam segala hal','P','umum',3,['kemuliaan']],
['Khairiyah','خَيْرِيَّة','Yang penuh kebaikan','P','umum',4,['keberkatan']],
['Lubna','لُبْنَى','Pokok yang mengeluarkan getah wangi','P','umum',2,['keindahan']],
['Luthfiah','لُطْفِيَّة','Yang lemah lembut dan baik hati','P','umum',3,['keindahan']],
['Madinah','مَدِينَة','Kota; bandar yang makmur','P','umum',3,['kemuliaan']],
['Maimunah','مَيْمُونَة','Yang diberkati dan bertuah','P','nabi',4,['keberkatan']],
['Masitah','مَاشِطَة','Wanita penyisir; sabar menghadapi ujian','P','umum',3,['kekuatan']],
['Munah','مُنَى','Harapan dan impian mulia','P','umum',2,['keberkatan']],
['Munirah','مُنِيرَة','Yang bercahaya terang','P','quran',3,['cahaya']],
['Murni','مُرْنِي','Yang suci dan bersih','P','umum',2,['keberkatan']],
['Nabila','نَبِيلَة','Yang mulia dan berbudi tinggi','P','umum',3,['kemuliaan']],
['Nailah','نَائِلَة','Yang mencapai matlamat','P','umum',2,['kemuliaan']],
['Nayla','نَيْلَة','Yang berjaya mencapai tujuan','P','umum',2,['kemuliaan']],
['Noor','نُور','Cahaya; sinar yang menerangi','P','quran',1,['cahaya']],
['Noorshahidah','نُورُ شَاهِدَة','Cahaya penyaksi','P','umum',5,['cahaya']],
['Norazlina','نُورُ أَزْلِينَة','Cahaya yang abadi','P','umum',5,['cahaya']],
['Putri','بُوتْرِي','Puteri; anak perempuan bangsawan','P','umum',2,['kemuliaan']],
['Qistina','قِسْطِينَة','Keadilan; yang berlaku adil','P','umum',3,['kemuliaan']],
['Qurrata','قُرَّة','Penyejuk mata; yang menggembirakan','P','quran',3,['keberkatan']],
['Rabiatul','رَابِعَةُ','Yang keempat; Rabiatul Adawiyah','P','umum',4,['keberkatan']],
['Rahimah','رَحِيمَة','Yang penuh kasih sayang','P','quran',3,['keberkatan']],
['Raudah','رَوْضَة','Taman syurga yang indah','P','umum',2,['keindahan','keberkatan']],
['Rawiyah','رَاوِيَة','Perawi hadith; yang menyampaikan','P','umum',4,['ilmu']],
['Raziah','رَاضِيَة','Yang redha dengan ketentuan Allah','P','umum',3,['keberkatan']],
['Ridhwanah','رِضْوَانَة','Keredhaan Allah','P','umum',4,['keberkatan']],
['Rohani','رُوحَانِي','Yang bersifat kerohanian','P','umum',3,['keberkatan']],
['Rohayu','رُوحَايُو','Yang menyegarkan jiwa','P','umum',3,['keberkatan']],
['Roslinah','رُوسْلِينَة','Mawar yang lembut','P','umum',3,['keindahan']],
['Rumaisa','رُمَيْصَاء','Sahabiyah Nabi yang mulia','P','sahabat',3,['kemuliaan']],
['Saadiah','سَعْدِيَّة','Yang penuh kebahagiaan','P','umum',4,['keberkatan']],
['Salmah','سَلْمَى','Orang yang hidup dalam keselamatan','P','umum',2,['keberkatan']],
['Salwah','سَلْوَى','Penghibur hati; kesenangan','P','quran',2,['keberkatan']],
['Saniah','سَنِيَّة','Yang tinggi darjatnya','P','umum',3,['kemuliaan']],
['Sarrah','سَرَّة','Yang menyukakan hati','P','umum',2,['keberkatan']],
['Shifa','شِفَاء','Penyembuhan; kesembuhan','P','quran',2,['keberkatan']],
['Shuhada','شُهَدَاء','Para syuhada; saksi kebenaran','P','umum',3,['kemuliaan']],
['Sumayyah','سُمَيَّة','Sahabiyah pertama syahid dalam Islam','P','sahabat',3,['kemuliaan','kekuatan']],
['Suraya','ثُرَيَّا','Bintang Pleiades; bintang yang cantik','P','umum',3,['cahaya','keindahan']],
['Thuwaibah','ثُوَيْبَة','Ibu susuan Nabi Muhammad ﷺ','P','nabi',3,['keberkatan']],
['Umairah','عُمَيْرَة','Yang panjang umur','P','umum',3,['keberkatan']],
['Wahidah','وَاحِدَة','Yang tunggal dan tiada tandingan','P','umum',3,['kemuliaan']],
['Wardah','وَرْدَة','Bunga mawar yang cantik','P','umum',2,['keindahan']],
['Widad','وِدَاد','Kasih sayang yang tulus','P','umum',2,['keberkatan']],
['Wieda','وِيدَا','Yang penuh kasih sayang','P','umum',2,['keberkatan']],
['Yasmin','يَاسَمِين','Bunga Jasmin yang harum','P','umum',3,['keindahan']],
['Yasmina','يَاسَمِينَة','Bunga Jasmin cantik','P','umum',4,['keindahan']],
['Yusra','يُسْرَى','Yang penuh kemudahan','P','quran',2,['keberkatan']],
['Zahidah','زَاهِدَة','Yang zuhud dari keduniaan','P','umum',3,['keberkatan']],
['Zahra','زَهْرَاء','Bunga yang cantik; yang bersinar','P','umum',2,['keindahan','cahaya']],
['Zainun','زَيْنُون','Yang indah dan cantik','P','umum',2,['keindahan']],
['Zakiah','زَكِيَّة','Yang suci dan bersih jiwa','P','quran',3,['keberkatan']],
['Zubaidah','زُبَيْدَة','Yang terkemuka; yang mulia','P','umum',3,['kemuliaan']],
['Zulaika','زُلَيْخَا','Wanita yang cantik jelita','P','quran',3,['keindahan']],
['Zulaikha','زُلَيْخَاء','Yang cantik dan mempesonakan','P','quran',3,['keindahan']],
['Zumairah','زُمَيْرَة','Yang menyanyikan pujian','P','umum',3,['keindahan']],
// ── UNISEKS ──
['Arif','عَارِف','Yang mengenal Allah; yang bijaksana','U','umum',2,['ilmu']],
['Faiz','فَائِز','Yang berjaya dan menang','U','umum',1,['kemuliaan']],
['Haidar','حَيْدَر','Singa; berani','U','umum',2,['kekuatan']],
['Izzati','عِزَّتِي','Kemuliaanku','U','umum',3,['kemuliaan']],
['Murni','مُرْنِي','Yang suci dan bersih','U','umum',2,['keberkatan']],
['Nur','نُور','Cahaya dari Allah','U','quran',1,['cahaya']],
['Rahimi','رَحِيمِي','Yang penuh kasih sayang','U','umum',3,['keberkatan']],
['Syafiq','شَفِيق','Yang penuh kasih sayang','U','umum',2,['keberkatan']],
['Zaki','زَكِي','Yang suci dan bersih','U','quran',2,['keberkatan']],
['Zahir','ظَاهِر','Yang jelas dan nyata','U','quran',2,['cahaya']],
];

// ════════════════════════════════════════
// STATE
// ════════════════════════════════════════
let nbxState = {
  gender: 'L',
  search: '',
  huruf: '',
  sumber: '',
  suku: '',
  theme: '',
  page: 1,
  perPage: 20,
  filtered: [],
  saved: [],
  combinedResult: null
};

// ════════════════════════════════════════
// INIT
// ════════════════════════════════════════
function nbxInit() {
  // Populate huruf dropdown
  const hurufSel = document.getElementById('nbxHuruf');
  const letters = [...new Set(NBX_DATA.map(n => n[0][0].toUpperCase()))].sort();
  letters.forEach(l => {
    const opt = document.createElement('option');
    opt.value = l;
    opt.textContent = 'Huruf ' + l;
    hurufSel.appendChild(opt);
  });

  // Populate combiner selects (lelaki names for default)
  nbxPopulateCombiner();

  // Update total count stat
  document.getElementById('nbxStatTotal').textContent = NBX_DATA.length + '+';

  nbxFilter();
}

// ════════════════════════════════════════
// FILTER LOGIC
// ════════════════════════════════════════
function nbxFilter() {
  const s = nbxState;
  s.search = document.getElementById('nbxSearch').value.toLowerCase().trim();
  s.huruf = document.getElementById('nbxHuruf').value;
  s.sumber = document.getElementById('nbxSumber').value;
  s.suku = document.getElementById('nbxSuku').value;
  s.page = 1;

  s.filtered = NBX_DATA.filter(n => {
    const [name, arabic, meaning, gender, source, syllables, themes] = n;
    if (s.gender !== 'ALL' && gender !== s.gender) return false;
    if (s.huruf && name[0].toUpperCase() !== s.huruf) return false;
    if (s.sumber && source !== s.sumber) return false;
    if (s.suku && syllables !== parseInt(s.suku) && !(s.suku === '4' && syllables >= 4)) return false;
    if (s.theme && !themes.includes(s.theme)) return false;
    if (s.search) {
      const q = s.search;
      if (!name.toLowerCase().includes(q) && !meaning.toLowerCase().includes(q) && !arabic.includes(q)) return false;
    }
    return true;
  });

  document.getElementById('nbxCount').textContent = s.filtered.length;
  nbxRenderGrid();
  nbxRenderPagination();
}

function nbxOnSearch() {
  clearTimeout(nbxState._searchTimer);
  nbxState._searchTimer = setTimeout(nbxFilter, 250);
}

function nbxSetGender(g) {
  nbxState.gender = g;
  document.querySelectorAll('.nbx-gender-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.gender === g);
  });
  nbxPopulateCombiner();
  nbxFilter();
}

function nbxSetTheme(el, theme) {
  nbxState.theme = theme;
  document.querySelectorAll('.nbx-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  nbxFilter();
}

function nbxClearFilters() {
  nbxState.search = '';
  nbxState.huruf = '';
  nbxState.sumber = '';
  nbxState.suku = '';
  nbxState.theme = '';
  document.getElementById('nbxSearch').value = '';
  document.getElementById('nbxHuruf').value = '';
  document.getElementById('nbxSumber').value = '';
  document.getElementById('nbxSuku').value = '';
  document.querySelectorAll('.nbx-chip').forEach((c,i) => c.classList.toggle('active', i===0));
  nbxFilter();
}

// ════════════════════════════════════════
// RENDER GRID
// ════════════════════════════════════════
function nbxRenderGrid() {
  const grid = document.getElementById('nbxGrid');
  const { filtered, page, perPage, saved } = nbxState;
  const start = (page - 1) * perPage;
  const slice = filtered.slice(start, start + perPage);

  if (slice.length === 0) {
    grid.innerHTML = `<div class="nbx-empty" style="grid-column:1/-1">
      <div class="nbx-empty-icon">🔍</div>
      <div class="nbx-empty-title">Tiada nama dijumpai</div>
      <div class="nbx-empty-sub">Cuba ubah kata carian atau tetapkan semula penapis</div>
    </div>`;
    return;
  }

  grid.innerHTML = slice.map(n => {
    const [name, arabic, meaning, gender, source, syllables, themes] = n;
    const isSaved = saved.includes(name);
    const tagClass = { quran:'nbx-tag-quran', nabi:'nbx-tag-nabi', hadith:'nbx-tag-hadith', umum:'nbx-tag-umum', sahabat:'nbx-tag-sahabat' }[source] || 'nbx-tag-umum';
    const tagLabel = { quran:'📖 Al-Quran', nabi:'🌟 Nama Nabi', hadith:'📜 Hadith', umum:'✨ Umum', sahabat:'⭐ Sahabat' }[source] || '✨ Umum';
    const genderIcon = { L:'👦', P:'👧', U:'✨' }[gender];

    return `<div class="nbx-card${isSaved ? ' saved' : ''}" id="nbxCard_${name.replace(/\s/g,'_')}">
      <div class="nbx-card-arabic">${arabic}</div>
      <div class="nbx-card-name">${name} ${genderIcon}</div>
      <div class="nbx-card-meaning">${meaning}</div>
      <div class="nbx-card-tags">
        <span class="nbx-tag ${tagClass}">${tagLabel}</span>
        ${themes.slice(0,2).map(t => `<span class="nbx-tag nbx-tag-umum">${t}</span>`).join('')}
      </div>
      <div class="nbx-card-actions">
        <button class="nbx-btn-copy" id="nbxCopy_${name.replace(/\s/g,'_')}" onclick="nbxCopy('${name}','${meaning}',this)">📋 Salin</button>
        <button class="nbx-btn-wa" onclick="nbxWA('${name}','${meaning}','${arabic}')">📤 WA</button>
        <button class="nbx-btn-save${isSaved?' saved':''}" onclick="nbxToggleSave('${name}')" title="${isSaved?'Keluarkan dari senarai':'Simpan ke senarai'}">⭐</button>
      </div>
    </div>`;
  }).join('');
}

// ════════════════════════════════════════
// PAGINATION
// ════════════════════════════════════════
function nbxRenderPagination() {
  const { filtered, page, perPage } = nbxState;
  const totalPages = Math.ceil(filtered.length / perPage);
  const pg = document.getElementById('nbxPagination');
  if (totalPages <= 1) { pg.innerHTML = ''; return; }

  let html = `<button class="nbx-page-btn" onclick="nbxGoPage(${page-1})" ${page===1?'disabled':''}>‹</button>`;
  const start = Math.max(1, page-2);
  const end = Math.min(totalPages, page+2);
  if (start > 1) html += `<button class="nbx-page-btn" onclick="nbxGoPage(1)">1</button>${start>2?'<span class="nbx-page-info">…</span>':''}`;
  for (let i = start; i <= end; i++) {
    html += `<button class="nbx-page-btn${i===page?' active':''}" onclick="nbxGoPage(${i})">${i}</button>`;
  }
  if (end < totalPages) html += `${end<totalPages-1?'<span class="nbx-page-info">…</span>':''}<button class="nbx-page-btn" onclick="nbxGoPage(${totalPages})">${totalPages}</button>`;
  html += `<button class="nbx-page-btn" onclick="nbxGoPage(${page+1})" ${page===totalPages?'disabled':''}>›</button>`;
  html += `<span class="nbx-page-info">Halaman ${page} / ${totalPages}</span>`;
  pg.innerHTML = html;
}

function nbxGoPage(p) {
  const totalPages = Math.ceil(nbxState.filtered.length / nbxState.perPage);
  if (p < 1 || p > totalPages) return;
  nbxState.page = p;
  nbxRenderGrid();
  nbxRenderPagination();
  document.getElementById('nbxGrid').scrollIntoView({ behavior:'smooth', block:'start' });
}

// ════════════════════════════════════════
// COPY &amp; SHARE
// ════════════════════════════════════════
function nbxCopy(name, meaning, btn) {
  const text = `${name}\nMaksud: ${meaning}`;
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.innerHTML;
    btn.innerHTML = '✅ Disalin!';
    btn.classList.add('copied');
    setTimeout(() => { btn.innerHTML = orig; btn.classList.remove('copied'); }, 2000);
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    const orig = btn.innerHTML;
    btn.innerHTML = '✅ Disalin!';
    setTimeout(() => { btn.innerHTML = orig; }, 2000);
  });
}

function nbxWA(name, meaning, arabic) {
  const msg = `🌙 *Nama Bayi Islam*\n\n*${name}*\nArabic: ${arabic}\nMaksud: ${meaning}\n\n_Sumber: IlmuAlam.com_`;
  window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank');
}

// ════════════════════════════════════════
// SAVE / SHORTLIST
// ════════════════════════════════════════
function nbxToggleSave(name) {
  const { saved } = nbxState;
  const idx = saved.indexOf(name);
  if (idx === -1) {
    if (saved.length >= 10) { alert('Maksimum 10 nama dalam senarai pendek.'); return; }
    saved.push(name);
  } else {
    saved.splice(idx, 1);
  }
  document.getElementById('nbxSavedCount').textContent = saved.length;
  nbxUpdateShortlist();
  nbxRenderGrid();
}

function nbxUpdateShortlist() {
  const { saved } = nbxState;
  const container = document.getElementById('nbxShortlistNames');
  const emptyMsg = document.getElementById('nbxShortlistEmpty');
  const shareBtn = document.getElementById('nbxShareAllBtn');

  if (saved.length === 0) {
    emptyMsg.style.display = '';
    shareBtn.style.display = 'none';
    container.innerHTML = '';
    container.appendChild(emptyMsg);
    return;
  }

  emptyMsg.style.display = 'none';
  shareBtn.style.display = '';
  container.innerHTML = saved.map(name =>
    `<div class="nbx-shortlist-pill">${name} <span class="nbx-shortlist-remove" onclick="nbxToggleSave('${name}')">✕</span></div>`
  ).join('');
}

function nbxShareAll() {
  const { saved } = nbxState;
  if (!saved.length) return;
  const names = saved.map(name => {
    const entry = NBX_DATA.find(n => n[0] === name);
    return entry ? `• *${name}* — ${entry[2]}` : `• ${name}`;
  }).join('\n');
  const msg = `🌙 *Senarai Nama Bayi Islam Pilihan*\n\n${names}\n\n_Dicari di IlmuAlam.com_`;
  window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank');
}

// ════════════════════════════════════════
// NAME COMBINER
// ════════════════════════════════════════
function nbxPopulateCombiner() {
  const gender = nbxState.gender === 'ALL' ? null : nbxState.gender;
  const names = NBX_DATA.filter(n => !gender || n[3] === gender || n[3] === 'U');

  ['nbxCombine1','nbxCombine2'].forEach(id => {
    const sel = document.getElementById(id);
    const prev = sel.value;
    sel.innerHTML = '<option value="">— Pilih Nama —</option>';
    names.forEach(n => {
      const opt = document.createElement('option');
      opt.value = n[0];
      opt.textContent = n[0];
      sel.appendChild(opt);
    });
    if (prev) sel.value = prev;
  });
}

function nbxCombineNames() {
  const n1 = document.getElementById('nbxCombine1').value;
  const n2 = document.getElementById('nbxCombine2').value;
  if (!n1 || !n2) { alert('Sila pilih dua nama untuk digabungkan.'); return; }
  if (n1 === n2) { alert('Sila pilih dua nama yang berbeza.'); return; }

  const e1 = NBX_DATA.find(n => n[0] === n1);
  const e2 = NBX_DATA.find(n => n[0] === n2);
  if (!e1 || !e2) return;

  const combinedName = `${n1} ${n2}`;
  const combinedArabic = `${e1[1]} ${e2[1]}`;
  const combinedMeaning = `${e1[2]} dan ${e2[2].charAt(0).toLowerCase() + e2[2].slice(1)}`;

  nbxState.combinedResult = { name: combinedName, arabic: combinedArabic, meaning: combinedMeaning };

  document.getElementById('nbxCombineName').textContent = combinedName;
  document.getElementById('nbxCombineArabic').textContent = combinedArabic;
  document.getElementById('nbxCombineMeaning').textContent = '📖 ' + combinedMeaning;
  document.getElementById('nbxCombineResult').classList.add('show');
}

function nbxCopyCombined() {
  const r = nbxState.combinedResult;
  if (!r) return;
  const text = `${r.name}\nArabic: ${r.arabic}\nMaksud: ${r.meaning}`;
  navigator.clipboard.writeText(text).catch(() => {});
  const btn = document.querySelector('.nbx-combine-copy');
  btn.textContent = '✅ Disalin!';
  setTimeout(() => { btn.textContent = '📋 Salin Nama'; }, 2000);
}

function nbxWACombined() {
  const r = nbxState.combinedResult;
  if (!r) return;
  const msg = `🌙 *Nama Bayi Islam Pilihan*\n\n*${r.name}*\nArabic: ${r.arabic}\nMaksud: ${r.meaning}\n\n_Dicari di IlmuAlam.com_`;
  window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank');
}

// ════════════════════════════════════════
// BOOT
// ════════════════════════════════════════
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(nbxInit, 300));
} else {
  setTimeout(nbxInit, 300);
}

})();
