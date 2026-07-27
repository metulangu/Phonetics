import { PhonemeGroup } from '../types';

export const PHONEME_GROUPS: PhonemeGroup[] = [
  // --- MONOPHTHONGS ---
  {
    id: 'schwa-vowel',
    symbol: 'ə',
    exampleWord: 'alive',
    ipa: '/əˈlaɪv/',
    type: 'monophthongs',
    descriptionTr: 'Schwa - Vurgusuz nötr ünlü sesi.',
    descriptionEn: 'Unstressed neutral schwa vowel sound.',
    spellingPatterns: [
      { spelling: 'a', examples: ['about', 'separate'] },
      { spelling: 'e', examples: ['system'] },
      { spelling: 'o', examples: ['carrot'] },
      { spelling: 'ou', examples: ['famous'] },
      { spelling: 'er', examples: ['teacher'] },
      { spelling: 'or', examples: ['doctor'] },
      { spelling: 'ar', examples: ['dollar'] },
      { spelling: 'ure', examples: ['measure'] },
      { spelling: 'a_e', examples: ['separate'] }
    ],
    words: [
      { id: 'w_schwa_a_1', word: 'a', ipa: '/ə/', level: '1K', spellingPattern: 'a', translation: { tr: 'bir' }, exampleSentence: 'I saw a dog in the park.', sentenceTranslation: { tr: 'Parkta bir köpek gördüm.' } },
      { id: 'w_schwa_a_2', word: 'about', ipa: '/əˈbaʊt/', level: '1K', spellingPattern: 'a', translation: { tr: 'hakkında' }, exampleSentence: 'We talked about our summer plans.', sentenceTranslation: { tr: 'Yaz planlarımız hakkında konuştuk.' } },
      { id: 'w_schwa_a_3', word: 'above', ipa: '/əˈbʌv/', level: '1K', spellingPattern: 'a', translation: { tr: 'yukarısında' }, exampleSentence: 'The birds flew high above the clouds.', sentenceTranslation: { tr: 'Kuşlar bulutların yükseklerinde uçtu.' } },
      { id: 'w_schwa_a_4', word: 'abroad', ipa: '/əˈbrɔːd/', level: '2K', spellingPattern: 'a', translation: { tr: 'yurtdışı' }, exampleSentence: 'She plans to study abroad next year.', sentenceTranslation: { tr: 'Gelecek yıl yurtdışında okumayı planlıyor.' } },
      { id: 'w_schwa_a_5', word: 'accept', ipa: '/əkˈsept/', level: '2K', spellingPattern: 'a', translation: { tr: 'kabul etmek' }, exampleSentence: 'He decided to accept the job offer.', sentenceTranslation: { tr: 'İş teklifini kabul etmeye karar verdi.' } },
      { id: 'w_schwa_a_6', word: 'account', ipa: '/əˈkaʊnt/', level: '2K', spellingPattern: 'a', translation: { tr: 'hesap' }, exampleSentence: 'Please log into your bank account online.', sentenceTranslation: { tr: 'Lütfen internetten banka hesabınıza giriş yapın.' } },
      { id: 'w_schwa_a_7', word: 'achieve', ipa: '/əˈtʃiːv/', level: '2K', spellingPattern: 'a', translation: { tr: 'başarmak' }, exampleSentence: 'Hard work will help you achieve your goals.', sentenceTranslation: { tr: 'Sıkı çalışma hedeflerinize ulaşmanıza yardımcı olur.' } },
      { id: 'w_schwa_a_8', word: 'across', ipa: '/əˈkrɒs/', level: '1K', spellingPattern: 'a', translation: { tr: 'karşısında' }, exampleSentence: 'She walked across the wooden bridge.', sentenceTranslation: { tr: 'Ahşap köprünün karşısına geçti.' } },
      { id: 'w_schwa_a_9', word: 'address', ipa: '/əˈdres/', level: '2K', spellingPattern: 'a', translation: { tr: 'adres' }, exampleSentence: 'Write your home address on this document.', sentenceTranslation: { tr: 'Bu belgeye ev adresinizi yazın.' } },
      { id: 'w_schwa_a_10', word: 'adopt', ipa: '/əˈdɒpt/', level: '2K', spellingPattern: 'a', translation: { tr: 'evlat edinmek / benimsemek' }, exampleSentence: 'They decided to adopt a puppy from the shelter.', sentenceTranslation: { tr: 'Barınaktan bir yavru köpek sahiplenmeye karar verdiler.' } },
      { id: 'w_schwa_a_11', word: 'advantage', ipa: '/ədˈvɑːntɪdʒ/', level: '2K', spellingPattern: 'a', translation: { tr: 'avantaj' }, exampleSentence: 'Taking this course gives you an advantage.', sentenceTranslation: { tr: 'Bu kursu almak size avantaj sağlar.' } },
      { id: 'w_schwa_a_12', word: 'advice', ipa: '/ədˈvaɪs/', level: '2K', spellingPattern: 'a', translation: { tr: 'tavsiye' }, exampleSentence: 'Thank you for giving me such useful advice.', sentenceTranslation: { tr: 'Bana bu kadar yararlı tavsiyeler verdiğiniz için teşekkür ederim.' } },
      { id: 'w_schwa_a_13', word: 'afford', ipa: '/əˈfɔːd/', level: '2K', spellingPattern: 'a', translation: { tr: 'gücü yetmek' }, exampleSentence: 'We cannot afford to buy a new car right now.', sentenceTranslation: { tr: 'Şu anda yeni bir araba almaya gücümüz yetmiyor.' } },
      { id: 'w_schwa_a_14', word: 'afraid', ipa: '/əˈfreɪd/', level: '2K', spellingPattern: 'a', translation: { tr: 'korkmuş' }, exampleSentence: 'There is no reason to be afraid of the dark.', sentenceTranslation: { tr: 'Karanlıktan korkmak için bir neden yok.' } },
      { id: 'w_schwa_a_15', word: 'again', ipa: '/əˈɡen/', level: '1K', spellingPattern: 'a', translation: { tr: 'tekrar' }, exampleSentence: 'Please call me again tomorrow morning.', sentenceTranslation: { tr: 'Lütfen yarın sabah beni tekrar arayın.' } },
      { id: 'w_schwa_a_16', word: 'against', ipa: '/əˈɡenst/', level: '1K', spellingPattern: 'a', translation: { tr: 'karşı' }, exampleSentence: 'They voted against the new tax policy.', sentenceTranslation: { tr: 'Yeni vergi politikasına karşı oy kullandılar.' } },
      { id: 'w_schwa_a_17', word: 'agenda', ipa: '/əˈdʒendə/', level: '3K', spellingPattern: 'a', translation: { tr: 'gündem' }, exampleSentence: 'What is the first item on today\'s agenda?', sentenceTranslation: { tr: 'Bugünkü gündemin ilk maddesi nedir?' } },
      { id: 'w_schwa_a_18', word: 'ago', ipa: '/əˈɡəʊ/', level: '1K', spellingPattern: 'a', translation: { tr: 'önce' }, exampleSentence: 'He left the office ten minutes ago.', sentenceTranslation: { tr: 'Ofisten on dakika önce ayrıldı.' } },
      { id: 'w_schwa_a_19', word: 'agree', ipa: '/əˈɡriː/', level: '1K', spellingPattern: 'a', translation: { tr: 'katılmak' }, exampleSentence: 'I fully agree with your opinion.', sentenceTranslation: { tr: 'Fikrinize tamamen katılıyorum.' } },
      { id: 'w_schwa_a_20', word: 'ahead', ipa: '/əˈhed/', level: '1K', spellingPattern: 'a', translation: { tr: 'ileride' }, exampleSentence: 'Go straight ahead for two blocks.', sentenceTranslation: { tr: 'İki blok boyunca dosdoğru ilerleyin.' } },
      { id: 'w_schwa_a_21', word: 'alarm', ipa: '/əˈlɑːm/', level: '2K', spellingPattern: 'a', translation: { tr: 'alarm' }, exampleSentence: 'My alarm clock rang at seven o\'clock.', sentenceTranslation: { tr: 'Çalar saatim saat yedide çaldı.' } },
      { id: 'w_schwa_a_22', word: 'alive', ipa: '/əˈlaɪv/', level: '1K', spellingPattern: 'a', translation: { tr: 'canlı / hayatta' }, exampleSentence: 'The doctor confirmed that the patient was alive.', sentenceTranslation: { tr: 'Doktor hastanın hayatta olduğunu doğruladı.' } },
      { id: 'w_schwa_a_23', word: 'allow', ipa: '/əˈlaʊ/', level: '1K', spellingPattern: 'a', translation: { tr: 'izin vermek' }, exampleSentence: 'Pets are not allowed inside the restaurant.', sentenceTranslation: { tr: 'Restoranın içine evcil hayvan kabul edilmemektedir.' } },
      { id: 'w_schwa_a_24', word: 'alone', ipa: '/əˈləʊn/', level: '1K', spellingPattern: 'a', translation: { tr: 'yalnız' }, exampleSentence: 'He prefers to study alone in his room.', sentenceTranslation: { tr: 'Odasında yalnız ders çalışmayı tercih eder.' } },
      { id: 'w_schwa_a_25', word: 'along', ipa: '/əˈlɒŋ/', level: '1K', spellingPattern: 'a', translation: { tr: 'boyunca' }, exampleSentence: 'We took a walk along the beach.', sentenceTranslation: { tr: 'Sahil boyunca yürüyüş yaptık.' } },
      { id: 'w_schwa_a_26', word: 'aloud', ipa: '/əˈlaʊd/', level: '2K', spellingPattern: 'a', translation: { tr: 'yüksek sesle' }, exampleSentence: 'She read the story aloud to the class.', sentenceTranslation: { tr: 'Hikayeyi sınıfa yüksek sesle okudu.' } },
      { id: 'w_schwa_a_27', word: 'alumni', ipa: '/əˈlʌmnaɪ/', level: '3K', spellingPattern: 'a', translation: { tr: 'mezunlar' }, exampleSentence: 'University alumni attended the reunion event.', sentenceTranslation: { tr: 'Üniversite mezunları buluşma etkinliğine katıldı.' } },
      { id: 'w_schwa_a_28', word: 'amaze', ipa: '/əˈmeɪz/', level: '3K', spellingPattern: 'a', translation: { tr: 'şaşırtmak' }, exampleSentence: 'Your magic tricks never fail to amaze me.', sentenceTranslation: { tr: 'Sihirbazlık numaraların beni şaşırtmaktan asla geri kalmıyor.' } },
      { id: 'w_schwa_a_29', word: 'amend', ipa: '/əˈmend/', level: '3K', spellingPattern: 'a', translation: { tr: 'düzeltmek' }, exampleSentence: 'Parliament plans to amend the current law.', sentenceTranslation: { tr: 'Parlamento mevcut yasayı değiştirmeyi planlıyor.' } },
      { id: 'w_schwa_a_30', word: 'among', ipa: '/əˈmʌŋ/', level: '1K', spellingPattern: 'a', translation: { tr: 'arasında' }, exampleSentence: 'He felt comfortable among his close friends.', sentenceTranslation: { tr: 'Yakın arkadaşları arasında kendini rahat hissetti.' } },
      { id: 'w_schwa_a_31', word: 'amount', ipa: '/əˈmaʊnt/', level: '1K', spellingPattern: 'a', translation: { tr: 'miktar' }, exampleSentence: 'A huge amount of work was completed today.', sentenceTranslation: { tr: 'Bugün büyük miktarda iş tamamlandı.' } },
      { id: 'w_schwa_a_32', word: 'amuse', ipa: '/əˈmjuːz/', level: '3K', spellingPattern: 'a', translation: { tr: 'eğlendirmek' }, exampleSentence: 'The clown tried to amuse the children.', sentenceTranslation: { tr: 'Palyaço çocukları eğlendirmeye çalıştı.' } },
      { id: 'w_schwa_a_33', word: 'announce', ipa: '/əˈnaʊns/', level: '2K', spellingPattern: 'a', translation: { tr: 'duyurmak' }, exampleSentence: 'They will announce the winners this afternoon.', sentenceTranslation: { tr: 'Kazananları bu öğleden sonra duyuracaklar.' } },
      { id: 'w_schwa_a_34', word: 'annoy', ipa: '/əˈnɔɪ/', level: '2K', spellingPattern: 'a', translation: { tr: 'rahatsız etmek' }, exampleSentence: 'Loud noises always annoy the neighbors.', sentenceTranslation: { tr: 'Yüksek sesler komşuları her zaman rahatsız eder.' } },
      { id: 'w_schwa_a_35', word: 'annoyance', ipa: '/əˈnɔɪəns/', level: '3K', spellingPattern: 'a', translation: { tr: 'rahatsızlık' }, exampleSentence: 'He expressed his annoyance at the delay.', sentenceTranslation: { tr: 'Gecikmeden duyduğu rahatsızlığı dile getirdi.' } },
      { id: 'w_schwa_a_36', word: 'anonymous', ipa: '/əˈnɒnɪməs/', level: '3K', spellingPattern: 'a', translation: { tr: 'anonim' }, exampleSentence: 'The donor wished to remain anonymous.', sentenceTranslation: { tr: 'Bağışçı isimsiz kalmak istedi.' } },
      { id: 'w_schwa_a_37', word: 'another', ipa: '/əˈnʌðə(r)/', level: '1K', spellingPattern: 'a', translation: { tr: 'başka bir' }, exampleSentence: 'Would you like another slice of cake?', sentenceTranslation: { tr: 'Bir dilim daha pasta ister misiniz?' } },
      { id: 'w_schwa_a_38', word: 'apart', ipa: '/əˈpɑːt/', level: '2K', spellingPattern: 'a', translation: { tr: 'ayrı' }, exampleSentence: 'The two houses are built far apart.', sentenceTranslation: { tr: 'İki ev birbirinden uzağa inşa edilmiş.' } },
      { id: 'w_schwa_a_39', word: 'apology', ipa: '/əˈpɒlədʒi/', level: '3K', spellingPattern: 'a', translation: { tr: 'özür' }, exampleSentence: 'He sent a sincere letter of apology.', sentenceTranslation: { tr: 'Samimi bir özür mektubu gönderdi.' } },
      { id: 'w_schwa_a_40', word: 'apparel', ipa: '/əˈpærəl/', level: '3K', spellingPattern: 'a', translation: { tr: 'giyim' }, exampleSentence: 'The shop sells high-end athletic apparel.', sentenceTranslation: { tr: 'Mağaza üst düzey spor giyim satmaktadır.' } },
      { id: 'w_schwa_a_41', word: 'apparent', ipa: '/əˈpærənt/', level: '3K', spellingPattern: 'a', translation: { tr: 'belirgin' }, exampleSentence: 'It was apparent that he needed medical help.', sentenceTranslation: { tr: 'Tıbbi yardıma ihtiyacı olduğu açıktı.' } },
      { id: 'w_schwa_a_42', word: 'appeal', ipa: '/əˈpiːl/', level: '2K', spellingPattern: 'a', translation: { tr: 'başvuru / çağrı' }, exampleSentence: 'The charity made an urgent appeal for donations.', sentenceTranslation: { tr: 'Hayır kurumu bağışlar için acil bir çağrıda bulundu.' } },
      { id: 'w_schwa_a_43', word: 'appear', ipa: '/əˈpɪə(r)/', level: '1K', spellingPattern: 'a', translation: { tr: 'görünmek' }, exampleSentence: 'Stars appear in the sky at night.', sentenceTranslation: { tr: 'Gece gökyüzünde yıldızlar görünür.' } },
      { id: 'w_schwa_a_44', word: 'applause', ipa: '/əˈplɔːz/', level: '3K', spellingPattern: 'a', translation: { tr: 'alkış' }, exampleSentence: 'The audience burst into loud applause.', sentenceTranslation: { tr: 'Seyirciler coşkulu bir alkış kopardı.' } },
      { id: 'w_schwa_a_45', word: 'apply', ipa: '/əˈplaɪ/', level: '2K', spellingPattern: 'a', translation: { tr: 'başvurmak' }, exampleSentence: 'You need to apply online for a visa.', sentenceTranslation: { tr: 'Vize için çevrimiçi başvurmanız gerekmektedir.' } },
      { id: 'w_schwa_a_46', word: 'approve', ipa: '/əˈpruːv/', level: '2K', spellingPattern: 'a', translation: { tr: 'onaylamak' }, exampleSentence: 'The manager will approve your travel budget.', sentenceTranslation: { tr: 'Yönetici seyahat bütçenizi onaylayacaktır.' } },
      { id: 'w_schwa_a_47', word: 'area', ipa: '/ˈeəriə/', level: '2K', spellingPattern: 'a', translation: { tr: 'alan' }, exampleSentence: 'This quiet area is perfect for families.', sentenceTranslation: { tr: 'Bu sakin bölge aileler için mükemmeldir.' } },
      { id: 'w_schwa_a_48', word: 'arena', ipa: '/əˈriːnə/', level: '3K', spellingPattern: 'a', translation: { tr: 'arena' }, exampleSentence: 'Thousands of fans gathered inside the sports arena.', sentenceTranslation: { tr: 'Binlerce taraftar spor arenasının içinde toplandı.' } },
      { id: 'w_schwa_a_49', word: 'arise', ipa: '/əˈraɪz/', level: '2K', spellingPattern: 'a', translation: { tr: 'ortaya çıkmak' }, exampleSentence: 'New opportunities will arise soon.', sentenceTranslation: { tr: 'Yakında yeni fırsatlar ortaya çıkacaktır.' } },
      { id: 'w_schwa_a_50', word: 'aroma', ipa: '/əˈrəʊmə/', level: '3K', spellingPattern: 'a', translation: { tr: 'aroma' }, exampleSentence: 'The delicious aroma of fresh bread filled the room.', sentenceTranslation: { tr: 'Taze ekmeğin nefis aroması odayı doldurdu.' } },
      { id: 'w_schwa_a_51', word: 'around', ipa: '/əˈraʊnd/', level: '1K', spellingPattern: 'a', translation: { tr: 'etrafında' }, exampleSentence: 'They took a walk around the neighborhood.', sentenceTranslation: { tr: 'Mahallede bir yürüyüş yaptılar.' } },
      { id: 'w_schwa_a_52', word: 'arouse', ipa: '/əˈraʊz/', level: '3K', spellingPattern: 'a', translation: { tr: 'uyandırmak' }, exampleSentence: 'His mysterious behavior began to arouse suspicion.', sentenceTranslation: { tr: 'Gizemli davranışları şüphe uyandırmaya başladı.' } },
      { id: 'w_schwa_a_53', word: 'arrange', ipa: '/əˈreɪndʒ/', level: '2K', spellingPattern: 'a', translation: { tr: 'düzenlemek' }, exampleSentence: 'Let us arrange a meeting for next Monday.', sentenceTranslation: { tr: 'Gelecek pazartesi için bir toplantı düzenleyelim.' } },
      { id: 'w_schwa_a_54', word: 'arrest', ipa: '/əˈrest/', level: '2K', spellingPattern: 'a', translation: { tr: 'tutuklamak' }, exampleSentence: 'The police arrived to arrest the suspect.', sentenceTranslation: { tr: 'Polis şüpheliyi tutuklamak için geldi.' } },
      { id: 'w_schwa_a_55', word: 'arrive', ipa: '/əˈraɪv/', level: '1K', spellingPattern: 'a', translation: { tr: 'varmak' }, exampleSentence: 'What time will the train arrive at the station?', sentenceTranslation: { tr: 'Tren istasyona saat kaçta varacak?' } },
      { id: 'w_schwa_a_56', word: 'ascent', ipa: '/əˈsent/', level: '3K', spellingPattern: 'a', translation: { tr: 'tırmanış' }, exampleSentence: 'The climber began the steep ascent.', sentenceTranslation: { tr: 'Dağcı dik tırmanışa başladı.' } },
      { id: 'w_schwa_a_57', word: 'ashamed', ipa: '/əˈʃeɪmd/', level: '2K', spellingPattern: 'a', translation: { tr: 'utanç duyan' }, exampleSentence: 'He felt ashamed of his rude behavior.', sentenceTranslation: { tr: 'Kaba davranışından utanç duydu.' } },
      { id: 'w_schwa_a_58', word: 'aside', ipa: '/əˈsaɪd/', level: '2K', spellingPattern: 'a', translation: { tr: 'kenara' }, exampleSentence: 'Set those papers aside for a moment.', sentenceTranslation: { tr: 'O kağıtları bir anlığına kenara koyun.' } },
      { id: 'w_schwa_a_59', word: 'asleep', ipa: '/əˈsliːp/', level: '1K', spellingPattern: 'a', translation: { tr: 'uykuda' }, exampleSentence: 'The baby fell asleep during the car ride.', sentenceTranslation: { tr: 'Bebek araba yolculuğu sırasında uykuya daldı.' } },
      { id: 'w_schwa_a_60', word: 'assemble', ipa: '/əˈsembl/', level: '3K', spellingPattern: 'a', translation: { tr: 'monte etmek' }, exampleSentence: 'It takes an hour to assemble this table.', sentenceTranslation: { tr: 'Bu masayı monte etmek bir saat sürüyor.' } },
      { id: 'w_schwa_a_61', word: 'assign', ipa: '/əˈsaɪn/', level: '3K', spellingPattern: 'a', translation: { tr: 'atamak' }, exampleSentence: 'The teacher will assign new homework tomorrow.', sentenceTranslation: { tr: 'Öğretmen yarın yeni ödev verecek.' } },
      { id: 'w_schwa_a_62', word: 'assist', ipa: '/əˈsɪst/', level: '2K', spellingPattern: 'a', translation: { tr: 'yardım etmek' }, exampleSentence: 'I am here to assist you with your work.', sentenceTranslation: { tr: 'İşinizde size yardımcı olmak için buradayım.' } },
      { id: 'w_schwa_a_63', word: 'assume', ipa: '/əˈsjuːm/', level: '2K', spellingPattern: 'a', translation: { tr: 'varsaymak' }, exampleSentence: 'Do not assume everything you read is true.', sentenceTranslation: { tr: 'Okuduğunuz her şeyin doğru olduğunu varsaymayın.' } },
      { id: 'w_schwa_a_64', word: 'assure', ipa: '/əˈʃʊə(r)/', level: '3K', spellingPattern: 'a', translation: { tr: 'güvence vermek' }, exampleSentence: 'I can assure you that everything will be fine.', sentenceTranslation: { tr: 'Size her şeyin iyi olacağına dair güvence verebilirim.' } },
      { id: 'w_schwa_a_65', word: 'astonish', ipa: '/əˈstɒnɪʃ/', level: '3K', spellingPattern: 'a', translation: { tr: 'şaşırtmak' }, exampleSentence: 'The incredible view will astonish every visitor.', sentenceTranslation: { tr: 'İnanılmaz manzara her ziyaretçiyi şaşırtacak.' } },
      { id: 'w_schwa_a_66', word: 'astronomy', ipa: '/əˈstrɒnəmi/', level: '3K', spellingPattern: 'a', translation: { tr: 'astronomi' }, exampleSentence: 'She developed a strong passion for astronomy.', sentenceTranslation: { tr: 'Astronomiye karşı güçlü bir tutku geliştirdi.' } },
      { id: 'w_schwa_a_67', word: 'attach', ipa: '/əˈtætʃ/', level: '2K', spellingPattern: 'a', translation: { tr: 'eklemek' }, exampleSentence: 'Please attach the file to your email.', sentenceTranslation: { tr: 'Lütfen dosyayı e-postanıza ekleyin.' } },
      { id: 'w_schwa_a_68', word: 'attack', ipa: '/əˈtæk/', level: '2K', spellingPattern: 'a', translation: { tr: 'saldırmak' }, exampleSentence: 'Army forces defended the city from attack.', sentenceTranslation: { tr: 'Ordu güçleri şehri saldırıdan korudu.' } },
      { id: 'w_schwa_a_69', word: 'attain', ipa: '/əˈteɪn/', level: '3K', spellingPattern: 'a', translation: { tr: 'elde etmek' }, exampleSentence: 'She worked hard to attain high academic marks.', sentenceTranslation: { tr: 'Yüksek akademik notlar elde etmek için çok çalıştı.' } },
      { id: 'w_schwa_a_70', word: 'attempt', ipa: '/əˈtempt/', level: '2K', spellingPattern: 'a', translation: { tr: 'girişimde bulunmak' }, exampleSentence: 'He made an attempt to solve the puzzle.', sentenceTranslation: { tr: 'Bulmacayı çözmek için bir girişimde bulundu.' } },
      { id: 'w_schwa_a_71', word: 'attend', ipa: '/əˈtend/', level: '2K', spellingPattern: 'a', translation: { tr: 'katılmak' }, exampleSentence: 'Many students attend the annual conference.', sentenceTranslation: { tr: 'Yıllık konferansa birçok öğrenci katılıyor.' } },
      { id: 'w_schwa_a_72', word: 'attorney', ipa: '/əˈtɜːni/', level: '3K', spellingPattern: 'a', translation: { tr: 'avukat' }, exampleSentence: 'He hired an experienced attorney for his trial.', sentenceTranslation: { tr: 'Davası için deneyimli bir avukat tuttu.' } },
      { id: 'w_schwa_a_73', word: 'attract', ipa: '/əˈtrækt/', level: '2K', spellingPattern: 'a', translation: { tr: 'çekmek' }, exampleSentence: 'Bright flowers attract bees and butterflies.', sentenceTranslation: { tr: 'Parlak çiçekler arıları ve kelebekleri çeker.' } },
      { id: 'w_schwa_a_74', word: 'avoid', ipa: '/əˈvɔɪd/', level: '2K', spellingPattern: 'a', translation: { tr: 'kaçınmak' }, exampleSentence: 'Try to avoid eating junk food late at night.', sentenceTranslation: { tr: 'Gece geç saatlerde abur cubur yemekten kaçınmaya çalışın.' } },
      { id: 'w_schwa_a_75', word: 'awake', ipa: '/əˈweɪk/', level: '2K', spellingPattern: 'a', translation: { tr: 'uyanık' }, exampleSentence: 'I remained awake during the entire movie.', sentenceTranslation: { tr: 'Tüm film boyunca uyanık kaldım.' } },
      { id: 'w_schwa_a_76', word: 'awaken', ipa: '/əˈweɪkən/', level: '3K', spellingPattern: 'a', translation: { tr: 'uyandırmak' }, exampleSentence: 'Soft music will awaken you gently.', sentenceTranslation: { tr: 'Yumuşak müzik sizi nazikçe uyandıracak.' } },
      { id: 'w_schwa_a_77', word: 'aware', ipa: '/əˈweə(r)/', level: '2K', spellingPattern: 'a', translation: { tr: 'farkında' }, exampleSentence: 'Are you aware of the new safety rules?', sentenceTranslation: { tr: 'Yeni güvenlik kurallarının farkında mısınız?' } },
      { id: 'w_schwa_a_78', word: 'away', ipa: '/əˈweɪ/', level: '1K', spellingPattern: 'a', translation: { tr: 'uzakta' }, exampleSentence: 'The cat ran away when it saw the dog.', sentenceTranslation: { tr: 'Kedi köpeği görünce uzaklaştı.' } },
      { id: 'w_schwa_a_79', word: 'banana', ipa: '/bəˈnɑːnə/', level: '1K', spellingPattern: 'a', translation: { tr: 'muz' }, exampleSentence: 'I ate a fresh banana for breakfast.', sentenceTranslation: { tr: 'Kahvaltıda taze bir muz yedim.' } },
      { id: 'w_schwa_a_80', word: 'camera', ipa: '/ˈkæmrə/', level: '1K', spellingPattern: 'a', translation: { tr: 'kamera' }, exampleSentence: 'He bought a new digital camera yesterday.', sentenceTranslation: { tr: 'Dün yeni bir dijital kamera satın aldı.' } },
      { id: 'w_schwa_a_81', word: 'china', ipa: '/ˈtʃaɪnə/', level: '1K', spellingPattern: 'a', translation: { tr: 'porselen' }, exampleSentence: 'The tea set is made of fine white china.', sentenceTranslation: { tr: 'Çay takımı ince beyaz porselenden yapılmıştır.' } },
      { id: 'w_schwa_a_82', word: 'cinema', ipa: '/ˈsɪnəmɑː/', level: '1K', spellingPattern: 'a', translation: { tr: 'sinema' }, exampleSentence: 'We are going to the cinema tonight.', sentenceTranslation: { tr: 'Bu gece sinemaya gidiyoruz.' } },
      { id: 'w_schwa_a_83', word: 'data', ipa: '/ˈdeɪtə/', level: '1K', spellingPattern: 'a', translation: { tr: 'veri' }, exampleSentence: 'The scientific data was analyzed carefully.', sentenceTranslation: { tr: 'Bilimsel veriler dikkatle analiz edildi.' } },
      { id: 'w_schwa_a_84', word: 'drama', ipa: '/ˈdrɑːmə/', level: '2K', spellingPattern: 'a', translation: { tr: 'drama' }, exampleSentence: 'She enjoys watching historical drama series.', sentenceTranslation: { tr: 'Tarihi drama dizileri izlemekten hoşlanır.' } },
      { id: 'w_schwa_a_85', word: 'extra', ipa: '/ˈekstrə/', level: '2K', spellingPattern: 'a', translation: { tr: 'fazladan' }, exampleSentence: 'Do you need an extra blanket for tonight?', sentenceTranslation: { tr: 'Bu gece için ekstra bir battaniyeye ihtiyacınız var mı?' } },
      { id: 'w_schwa_a_86', word: 'flora', ipa: '/ˈflɔːrə/', level: '3K', spellingPattern: 'a', translation: { tr: 'bitki örtüsü' }, exampleSentence: 'The guide described the unique flora of the island.', sentenceTranslation: { tr: 'Rehber adanın benzersiz bitki örtüsünü anlattı.' } },
      { id: 'w_schwa_a_87', word: 'formula', ipa: '/ˈfɔːmjələ/', level: '3K', spellingPattern: 'a', translation: { tr: 'formül' }, exampleSentence: 'Chemists use this formula to make the solution.', sentenceTranslation: { tr: 'Kimyagerler çözeltiyi yapmak için bu formülü kullanırlar.' } },
      { id: 'w_schwa_a_88', word: 'gorilla', ipa: '/ɡəˈrɪlə/', level: '3K', spellingPattern: 'a', translation: { tr: 'goril' }, exampleSentence: 'The mountain gorilla is an endangered species.', sentenceTranslation: { tr: 'Dağ gorili nesli tehlikede olan bir türdür.' } },
      { id: 'w_schwa_a_89', word: 'hyena', ipa: '/haɪˈiːnə/', level: '3K', spellingPattern: 'a', translation: { tr: 'sırtlan' }, exampleSentence: 'We heard the wild laugh of a hyena.', sentenceTranslation: { tr: 'Vahşi bir sırtlanın kahkahasını duyduk.' } },
      { id: 'w_schwa_a_90', word: 'idea', ipa: '/aɪˈdɪə/', level: '1K', spellingPattern: 'a', translation: { tr: 'fikir' }, exampleSentence: 'That sounds like a great idea for our project.', sentenceTranslation: { tr: 'Bu projemiz için harika bir fikir gibi görünüyor.' } },
      { id: 'w_schwa_a_91', word: 'media', ipa: '/ˈmiːdiə/', level: '2K', spellingPattern: 'a', translation: { tr: 'medya' }, exampleSentence: 'Social media plays a big role in marketing.', sentenceTranslation: { tr: 'Sosyal medya pazarlamada büyük rol oynuyor.' } },
      { id: 'w_schwa_a_92', word: 'opera', ipa: '/ˈɒprə/', level: '2K', spellingPattern: 'a', translation: { tr: 'opera' }, exampleSentence: 'They enjoyed the opera performance.', sentenceTranslation: { tr: 'Opera performansından keyif aldılar.' } },
      { id: 'w_schwa_a_93', word: 'pizza', ipa: '/ˈpiːtsə/', level: '2K', spellingPattern: 'a', translation: { tr: 'pizza' }, exampleSentence: 'We ordered a large pepperoni pizza.', sentenceTranslation: { tr: 'Büyük boy sucuklu pizza sipariş ettik.' } },
      { id: 'w_schwa_a_94', word: 'replica', ipa: '/ˈreplɪkə/', level: '3K', spellingPattern: 'a', translation: { tr: 'kopya' }, exampleSentence: 'He bought a miniature replica of the Eiffel Tower.', sentenceTranslation: { tr: 'Eyfel Kulesi\'nin minyatür bir kopyasını satın aldı.' } },
      { id: 'w_schwa_a_95', word: 'salad', ipa: '/ˈsæləd/', level: '1K', spellingPattern: 'a', translation: { tr: 'salata' }, exampleSentence: 'I ordered a fresh green salad.', sentenceTranslation: { tr: 'Taze bir yeşil salata sipariş ettim.' } },
      { id: 'w_schwa_a_96', word: 'saliva', ipa: '/səˈlaɪvə/', level: '3K', spellingPattern: 'a', translation: { tr: 'tükürük' }, exampleSentence: 'Saliva helps in digesting food smoothly.', sentenceTranslation: { tr: 'Tükürük yiyeceklerin kolayca sindirilmesine yardımcı olur.' } },
      { id: 'w_schwa_a_97', word: 'sofa', ipa: '/ˈsəʊfə/', level: '1K', spellingPattern: 'a', translation: { tr: 'koltuk' }, exampleSentence: 'They sat on the living room sofa.', sentenceTranslation: { tr: 'Oturma odasındaki koltuğa oturdular.' } },
      { id: 'w_schwa_a_98', word: 'umbrella', ipa: '/ʌmˈbrelə/', level: '1K', spellingPattern: 'a', translation: { tr: 'şemsiye' }, exampleSentence: 'Don\'t forget to take your umbrella today.', sentenceTranslation: { tr: 'Bugün şemsiyenizi yanınıza almayı unutmayın.' } },
      { id: 'w_schwa_a_99', word: 'vanilla', ipa: '/vəˈnɪlə/', level: '1K', spellingPattern: 'a', translation: { tr: 'vanilya' }, exampleSentence: 'Vanilla ice cream is my favorite dessert.', sentenceTranslation: { tr: 'Vanilyalı dondurma en sevdiğim tatlıdır.' } },
      { id: 'w_schwa_a_100', word: 'zebra', ipa: '/ˈzebrə/', level: '3K', spellingPattern: 'a', translation: { tr: 'zebra' }, exampleSentence: 'A wild zebra ran across the open savanna.', sentenceTranslation: { tr: 'Vahşi bir zebra açık savanada koştu.' } },
      { id: 'w_system', word: 'system', ipa: '/ˈsɪstəm/', spellingPattern: 'e', translation: { tr: 'sistem' }, exampleSentence: 'The system is working.', sentenceTranslation: { tr: 'Sistem çalışıyor.' } },
      { id: 'w_carrot', word: 'carrot', ipa: '/ˈkærət/', spellingPattern: 'o', translation: { tr: 'havuç' }, exampleSentence: 'Rabbits like carrots.', sentenceTranslation: { tr: 'Tavşanlar havucu sever.' } },
      { id: 'w_famous', word: 'famous', ipa: '/ˈfeɪməs/', spellingPattern: 'ou', translation: { tr: 'ünlü' }, exampleSentence: 'She is a famous singer.', sentenceTranslation: { tr: 'O ünlü bir şarkıcı.' } },
      { id: 'w_teacher', word: 'teacher', ipa: '/ˈtiːtʃər/', spellingPattern: 'er', translation: { tr: 'öğretmen' }, exampleSentence: 'Our teacher is very helpful.', sentenceTranslation: { tr: 'Öğretmenimiz çok yardımsever.' } },
      { id: 'w_doctor', word: 'doctor', ipa: '/ˈdɒktər/', spellingPattern: 'or', translation: { tr: 'doktor' }, exampleSentence: 'Consult a doctor.', sentenceTranslation: { tr: 'Bir doktora danış.' } },
      { id: 'w_dollar', word: 'dollar', ipa: '/ˈdɒlər/', spellingPattern: 'ar', translation: { tr: 'dolar' }, exampleSentence: 'One US dollar.', sentenceTranslation: { tr: 'Bir Amerikan doları.' } },
      { id: 'w_measure', word: 'measure', ipa: '/ˈmeʒər/', spellingPattern: 'ure', translation: { tr: 'ölçmek' }, exampleSentence: 'Measure the area.', sentenceTranslation: { tr: 'Alanı ölç.' } },
      { id: 'w_separate', word: 'separate', ipa: '/ˈsepərət/', spellingPattern: 'a_e', translation: { tr: 'ayrı' }, exampleSentence: 'They went separate ways.', sentenceTranslation: { tr: 'Ayrı yollara gittiler.' } }
    ]
  },
  {
    id: 'i-short',
    symbol: 'ɪ',
    exampleWord: 'thin',
    ipa: '/θɪn/',
    type: 'monophthongs',
    descriptionTr: 'Kısa "i" sesi - Gevşek, rahat ses.',
    descriptionEn: 'Short lax front unrounded vowel.',
    spellingPatterns: [
      { spelling: 'i', examples: ['bit'] },
      { spelling: 'y', examples: ['gym'] },
      { spelling: 'e', examples: ['pretty'] },
      { spelling: 'ui', examples: ['build'] },
      { spelling: 'o', examples: ['women'] },
      { spelling: 'u', examples: ['busy'] }
    ],
    words: [
      { id: 'w_thin', word: 'thin', ipa: '/θɪn/', spellingPattern: 'i', translation: { tr: 'zayıf / ince' }, exampleSentence: 'A thin sheet of paper.', sentenceTranslation: { tr: 'İnce bir kağıt yaprağı.' } },
      { id: 'w_bit', word: 'bit', ipa: '/bɪt/', spellingPattern: 'i', translation: { tr: 'biraz' }, exampleSentence: 'Wait a bit.', sentenceTranslation: { tr: 'Biraz bekle.' } },
      { id: 'w_gym', word: 'gym', ipa: '/dʒɪm/', spellingPattern: 'y', translation: { tr: 'spor salonu' }, exampleSentence: 'He goes to the gym.', sentenceTranslation: { tr: 'Spor salonuna gidiyor.' } },
      { id: 'w_pretty', word: 'pretty', ipa: '/ˈprɪti/', spellingPattern: 'e', translation: { tr: 'sevimli' }, exampleSentence: 'A pretty picture.', sentenceTranslation: { tr: 'Sevimli bir resim.' } },
      { id: 'w_build', word: 'build', ipa: '/bɪld/', spellingPattern: 'ui', translation: { tr: 'inşa etmek' }, exampleSentence: 'Build a new house.', sentenceTranslation: { tr: 'Yeni bir ev inşa et.' } },
      { id: 'w_women', word: 'women', ipa: '/ˈwɪmɪn/', spellingPattern: 'o', translation: { tr: 'kadınlar' }, exampleSentence: 'Strong women.', sentenceTranslation: { tr: 'Güçlü kadınlar.' } },
      { id: 'w_busy', word: 'busy', ipa: '/ˈbɪzi/', spellingPattern: 'u', translation: { tr: 'meşgul' }, exampleSentence: 'I am busy today.', sentenceTranslation: { tr: 'Bugün meşgulüm.' } }
    ]
  },
  {
    id: 'u-short',
    symbol: 'ʊ',
    exampleWord: 'put',
    ipa: '/pʊt/',
    type: 'monophthongs',
    descriptionTr: 'Kısa "u" sesi.',
    descriptionEn: 'Short near-close near-back rounded vowel.',
    spellingPatterns: [
      { spelling: 'u', examples: ['put'] },
      { spelling: 'oo', examples: ['foot'] },
      { spelling: 'ou', examples: ['would'] }
    ],
    words: [
      { id: 'w_put', word: 'put', ipa: '/pʊt/', spellingPattern: 'u', translation: { tr: 'koymak' }, exampleSentence: 'Put it down.', sentenceTranslation: { tr: 'Onu aşağı koy.' } },
      { id: 'w_foot', word: 'foot', ipa: '/fʊt/', spellingPattern: 'oo', translation: { tr: 'ayak' }, exampleSentence: 'My foot hurts.', sentenceTranslation: { tr: 'Ayağım ağrıyor.' } },
      { id: 'w_would', word: 'would', ipa: '/wʊd/', spellingPattern: 'ou', translation: { tr: '-er/ar idi' }, exampleSentence: 'I would like tea.', sentenceTranslation: { tr: 'Çay isterim.' } },
      { id: 'w_book_u', word: 'book', ipa: '/bʊk/', spellingPattern: 'oo', translation: { tr: 'kitap' }, exampleSentence: 'Read a book.', sentenceTranslation: { tr: 'Bir kitap oku.' } }
    ]
  },
  {
    id: 'e-vowel',
    symbol: 'e',
    exampleWord: 'went',
    ipa: '/went/',
    type: 'monophthongs',
    descriptionTr: 'Kısa "e" sesi.',
    descriptionEn: 'Short open-mid front unrounded vowel.',
    spellingPatterns: [
      { spelling: 'e', examples: ['bed'] },
      { spelling: 'ea', examples: ['head'] },
      { spelling: 'a', examples: ['many'] },
      { spelling: 'eo', examples: ['leopard'] },
      { spelling: 'ie', examples: ['friend'] }
    ],
    words: [
      { id: 'w_went', word: 'went', ipa: '/went/', spellingPattern: 'e', translation: { tr: 'gitti' }, exampleSentence: 'He went home.', sentenceTranslation: { tr: 'Eve gitti.' } },
      { id: 'w_bed', word: 'bed', ipa: '/bed/', spellingPattern: 'e', translation: { tr: 'yatak' }, exampleSentence: 'Go to bed.', sentenceTranslation: { tr: 'Yatağa git.' } },
      { id: 'w_head', word: 'head', ipa: '/hed/', spellingPattern: 'ea', translation: { tr: 'baş / kafa' }, exampleSentence: 'Nod your head.', sentenceTranslation: { tr: 'Başını salla.' } },
      { id: 'w_many', word: 'many', ipa: '/ˈmeni/', spellingPattern: 'a', translation: { tr: 'çoğu / pek çok' }, exampleSentence: 'How many books?', sentenceTranslation: { tr: 'Kaç tane kitap?' } },
      { id: 'w_leopard', word: 'leopard', ipa: '/ˈlepərd/', spellingPattern: 'eo', translation: { tr: 'leopar' }, exampleSentence: 'A fast leopard.', sentenceTranslation: { tr: 'Hızlı bir leopar.' } },
      { id: 'w_friend', word: 'friend', ipa: '/frend/', spellingPattern: 'ie', translation: { tr: 'arkadaş' }, exampleSentence: 'A good friend.', sentenceTranslation: { tr: 'İyi bir arkadaş.' } }
    ]
  },
  {
    id: 'uh-vowel',
    symbol: 'ʌ',
    exampleWord: 'fun',
    ipa: '/fʌn/',
    type: 'monophthongs',
    descriptionTr: 'Kısa "a/u" arası "ʌ" sesi.',
    descriptionEn: 'Short open-mid back unrounded vowel.',
    spellingPatterns: [
      { spelling: 'u', examples: ['run'] },
      { spelling: 'o', examples: ['son'] },
      { spelling: 'ou', examples: ['trouble'] },
      { spelling: 'oo', examples: ['blood'] }
    ],
    words: [
      { id: 'w_fun', word: 'fun', ipa: '/fʌn/', spellingPattern: 'u', translation: { tr: 'eğlence' }, exampleSentence: 'Have fun!', sentenceTranslation: { tr: 'İyi eğlenceler!' } },
      { id: 'w_run', word: 'run', ipa: '/rʌn/', spellingPattern: 'u', translation: { tr: 'koşmak' }, exampleSentence: 'Run fast.', sentenceTranslation: { tr: 'Hızlı koş.' } },
      { id: 'w_son', word: 'son', ipa: '/sʌn/', spellingPattern: 'o', translation: { tr: 'erkek evlat' }, exampleSentence: 'He has a son.', sentenceTranslation: { tr: 'Bir oğlu var.' } },
      { id: 'w_trouble', word: 'trouble', ipa: '/ˈtrʌbl/', spellingPattern: 'ou', translation: { tr: 'sorun / dert' }, exampleSentence: 'No trouble at all.', sentenceTranslation: { tr: 'Hiç sorun değil.' } },
      { id: 'w_blood', word: 'blood', ipa: '/blʌd/', spellingPattern: 'oo', translation: { tr: 'kan' }, exampleSentence: 'Blood pressure.', sentenceTranslation: { tr: 'Kan basıncı.' } }
    ]
  },
  {
    id: 'ae-vowel',
    symbol: 'æ',
    exampleWord: 'cat',
    ipa: '/kæt/',
    type: 'monophthongs',
    descriptionTr: 'Açık "æ" sesi - e ve a arası açık geniş ses.',
    descriptionEn: 'Near-open front unrounded vowel.',
    spellingPatterns: [
      { spelling: 'a', examples: ['cat'] },
      { spelling: 'ai', examples: ['plaid'] },
      { spelling: 'au', examples: ['laugh'] }
    ],
    words: [
      { id: 'w_cat_ae', word: 'cat', ipa: '/kæt/', spellingPattern: 'a', translation: { tr: 'kedi' }, exampleSentence: 'A black cat.', sentenceTranslation: { tr: 'Siyah bir kedi.' } },
      { id: 'w_plaid', word: 'plaid', ipa: '/plæd/', spellingPattern: 'ai', translation: { tr: 'ekose / kareli kumaş' }, exampleSentence: 'A plaid shirt.', sentenceTranslation: { tr: 'Kareli bir gömlek.' } },
      { id: 'w_laugh', word: 'laugh', ipa: '/læf/', spellingPattern: 'au', translation: { tr: 'gülmek' }, exampleSentence: 'Don\'t laugh.', sentenceTranslation: { tr: 'Gülme.' } }
    ]
  },
  {
    id: 'short-o-vowel',
    symbol: 'ɒ',
    exampleWord: 'rob',
    ipa: '/rɒb/',
    type: 'monophthongs',
    descriptionTr: 'Kısa yuvarlak "o" sesi.',
    descriptionEn: 'Open back rounded vowel sound.',
    spellingPatterns: [
      { spelling: 'o', examples: ['stop'] },
      { spelling: 'a', examples: ['swan'] },
      { spelling: 'ow', examples: ['knowledge'] },
      { spelling: 'ou', examples: ['cough'] }
    ],
    words: [
      { id: 'w_rob', word: 'rob', ipa: '/rɒb/', spellingPattern: 'o', translation: { tr: 'soymak / hırsızlık yapmak' }, exampleSentence: 'Don\'t rob banks.', sentenceTranslation: { tr: 'Bankaları soymayın.' } },
      { id: 'w_stop', word: 'stop', ipa: '/stɒp/', spellingPattern: 'o', translation: { tr: 'durmak' }, exampleSentence: 'Please stop here.', sentenceTranslation: { tr: 'Lütfen burada durun.' } },
      { id: 'w_swan', word: 'swan', ipa: '/swɒn/', spellingPattern: 'a', translation: { tr: 'kuğu' }, exampleSentence: 'A white swan.', sentenceTranslation: { tr: 'Beyaz bir kuğu.' } },
      { id: 'w_knowledge', word: 'knowledge', ipa: '/ˈnɒlɪdʒ/', spellingPattern: 'ow', translation: { tr: 'bilgi' }, exampleSentence: 'Knowledge is power.', sentenceTranslation: { tr: 'Bilgi güçtür.' } },
      { id: 'w_cough', word: 'cough', ipa: '/kɒf/', spellingPattern: 'ou', translation: { tr: 'öksürük / öksürmek' }, exampleSentence: 'A dry cough.', sentenceTranslation: { tr: 'Kuru bir öksürük.' } }
    ]
  },
  {
    id: 'i-long',
    symbol: 'iː',
    exampleWord: 'need',
    ipa: '/niːd/',
    type: 'monophthongs',
    descriptionTr: 'Uzun "i" sesi.',
    descriptionEn: 'Long close front unrounded vowel.',
    spellingPatterns: [
      { spelling: 'ee', examples: ['meet'] },
      { spelling: 'ea', examples: ['eat'] },
      { spelling: 'e', examples: ['be'] },
      { spelling: 'ie', examples: ['piece'] },
      { spelling: 'ei', examples: ['receive'] },
      { spelling: 'i', examples: ['ski'] },
      { spelling: 'ey', examples: ['key'] },
      { spelling: 'eo', examples: ['people'] }
    ],
    words: [
      { id: 'w_need', word: 'need', ipa: '/niːd/', spellingPattern: 'ee', translation: { tr: 'ihtiyacı olmak' }, exampleSentence: 'I need help.', sentenceTranslation: { tr: 'Yardıma ihtiyacım var.' } },
      { id: 'w_meet', word: 'meet', ipa: '/miːt/', spellingPattern: 'ee', translation: { tr: 'buluşmak' }, exampleSentence: 'Nice to meet you.', sentenceTranslation: { tr: 'Tanıştığıma memnun oldum.' } },
      { id: 'w_eat', word: 'eat', ipa: '/iːt/', spellingPattern: 'ea', translation: { tr: 'yemek' }, exampleSentence: 'Eat healthy food.', sentenceTranslation: { tr: 'Sağlıklı yemek ye.' } },
      { id: 'w_be', word: 'be', ipa: '/biː/', spellingPattern: 'e', translation: { tr: 'olmak' }, exampleSentence: 'Be happy.', sentenceTranslation: { tr: 'Mutlu ol.' } },
      { id: 'w_piece', word: 'piece', ipa: '/piːs/', spellingPattern: 'ie', translation: { tr: 'parça' }, exampleSentence: 'A piece of cake.', sentenceTranslation: { tr: 'Bir dilim pasta.' } },
      { id: 'w_receive', word: 'receive', ipa: '/rɪˈsiːv/', spellingPattern: 'ei', translation: { tr: 'teslim almak' }, exampleSentence: 'Receive an email.', sentenceTranslation: { tr: 'E-posta almak.' } },
      { id: 'w_ski', word: 'ski', ipa: '/skiː/', spellingPattern: 'i', translation: { tr: 'kayak yapmak' }, exampleSentence: 'Skiing in winter.', sentenceTranslation: { tr: 'Kışın kayak yapmak.' } },
      { id: 'w_key', word: 'key', ipa: '/kiː/', spellingPattern: 'ey', translation: { tr: 'anahtar' }, exampleSentence: 'Where is the key?', sentenceTranslation: { tr: 'Anahtar nerede?' } },
      { id: 'w_people', word: 'people', ipa: '/ˈpiːpl/', spellingPattern: 'eo', translation: { tr: 'insanlar' }, exampleSentence: 'Many people arrived.', sentenceTranslation: { tr: 'Birçok insan geldi.' } }
    ]
  },
  {
    id: 'u-long',
    symbol: 'uː',
    exampleWord: 'few',
    ipa: '/fjuː/',
    type: 'monophthongs',
    descriptionTr: 'Uzun "u" sesi.',
    descriptionEn: 'Long close back rounded vowel.',
    spellingPatterns: [
      { spelling: 'oo', examples: ['moon'] },
      { spelling: 'u', examples: ['tune'] },
      { spelling: 'ou', examples: ['group'] },
      { spelling: 'ew', examples: ['chew'] },
      { spelling: 'ue', examples: ['blue'] },
      { spelling: 'ui', examples: ['fruit'] },
      { spelling: 'o', examples: ['do'] }
    ],
    words: [
      { id: 'w_few', word: 'few', ipa: '/fjuː/', spellingPattern: 'ew', translation: { tr: 'az / birkaç' }, exampleSentence: 'A few minutes.', sentenceTranslation: { tr: 'Birkaç dakika.' } },
      { id: 'w_moon', word: 'moon', ipa: '/muːn/', spellingPattern: 'oo', translation: { tr: 'ay' }, exampleSentence: 'The full moon.', sentenceTranslation: { tr: 'Dolunay.' } },
      { id: 'w_tune', word: 'tune', ipa: '/tjuːn/', spellingPattern: 'u', translation: { tr: 'melodi' }, exampleSentence: 'A catchy tune.', sentenceTranslation: { tr: 'Akılda kalıcı bir melodi.' } },
      { id: 'w_group', word: 'group', ipa: '/ɡruːp/', spellingPattern: 'ou', translation: { tr: 'grup' }, exampleSentence: 'A small group.', sentenceTranslation: { tr: 'Küçük bir grup.' } },
      { id: 'w_chew', word: 'chew', ipa: '/tʃuː/', spellingPattern: 'ew', translation: { tr: 'çiğnemek' }, exampleSentence: 'Chew your food.', sentenceTranslation: { tr: 'Yemeğini çiğne.' } },
      { id: 'w_blue', word: 'blue', ipa: '/bluː/', spellingPattern: 'ue', translation: { tr: 'mavi' }, exampleSentence: 'Clear blue sky.', sentenceTranslation: { tr: 'Berrak mavi gökyüzü.' } },
      { id: 'w_fruit', word: 'fruit', ipa: '/fruːt/', spellingPattern: 'ui', translation: { tr: 'meyve' }, exampleSentence: 'Fresh fruit.', sentenceTranslation: { tr: 'Taze meyve.' } },
      { id: 'w_do', word: 'do', ipa: '/duː/', spellingPattern: 'o', translation: { tr: 'yapmak' }, exampleSentence: 'Just do it.', sentenceTranslation: { tr: 'Sadece yap.' } }
    ]
  },
  {
    id: 'er-long-three',
    symbol: 'ɜː',
    exampleWord: 'third',
    ipa: '/θɜːd/',
    type: 'monophthongs',
    descriptionTr: 'Uzun "ör" sesi.',
    descriptionEn: 'Open-mid central unrounded vowel.',
    spellingPatterns: [
      { spelling: 'ir', examples: ['bird'] },
      { spelling: 'er', examples: ['her'] },
      { spelling: 'ur', examples: ['turn'] },
      { spelling: 'ear', examples: ['learn'] },
      { spelling: 'or', examples: ['work'] },
      { spelling: 're', examples: ['theatre'] }
    ],
    words: [
      { id: 'w_third', word: 'third', ipa: '/θɜːd/', spellingPattern: 'ir', translation: { tr: 'üçüncü' }, exampleSentence: 'The third chapter.', sentenceTranslation: { tr: 'Üçüncü bölüm.' } },
      { id: 'w_bird', word: 'bird', ipa: '/bɜːd/', spellingPattern: 'ir', translation: { tr: 'kuş' }, exampleSentence: 'A singing bird.', sentenceTranslation: { tr: 'Öten bir kuş.' } },
      { id: 'w_her', word: 'her', ipa: '/hɜːr/', spellingPattern: 'er', translation: { tr: 'onun / ona' }, exampleSentence: 'Give it to her.', sentenceTranslation: { tr: 'Onu ona ver.' } },
      { id: 'w_turn', word: 'turn', ipa: '/tɜːn/', spellingPattern: 'ur', translation: { tr: 'dönmek' }, exampleSentence: 'Turn right here.', sentenceTranslation: { tr: 'Buradan sağa dön.' } },
      { id: 'w_learn', word: 'learn', ipa: '/lɜːn/', spellingPattern: 'ear', translation: { tr: 'öğrenmek' }, exampleSentence: 'Learn something new.', sentenceTranslation: { tr: 'Yeni bir şey öğren.' } },
      { id: 'w_work', word: 'work', ipa: '/wɜːk/', spellingPattern: 'or', translation: { tr: 'çalışmak' }, exampleSentence: 'Hard work pays off.', sentenceTranslation: { tr: 'Sıkı çalışma karşılığını verir.' } },
      { id: 'w_theatre', word: 'theatre', ipa: '/ˈθɪətər/', spellingPattern: 're', translation: { tr: 'tiyatro' }, exampleSentence: 'Go to the theatre.', sentenceTranslation: { tr: 'Tiyatroya git.' } }
    ]
  },
  {
    id: 'or-long-vowel',
    symbol: 'ɔː',
    exampleWord: 'talk',
    ipa: '/tɔːk/',
    type: 'monophthongs',
    descriptionTr: 'Uzun "or" sesi.',
    descriptionEn: 'Open-mid back rounded vowel.',
    spellingPatterns: [
      { spelling: 'al', examples: ['ball'] },
      { spelling: 'aw', examples: ['saw'] },
      { spelling: 'or', examples: ['port'] },
      { spelling: 'au', examples: ['fault'] },
      { spelling: 'oor', examples: ['door'] },
      { spelling: 'ough', examples: ['thought'] },
      { spelling: 'ar', examples: ['war'] }
    ],
    words: [
      { id: 'w_talk', word: 'talk', ipa: '/tɔːk/', spellingPattern: 'al', translation: { tr: 'konuşmak' }, exampleSentence: 'Let\'s talk.', sentenceTranslation: { tr: 'Hadi konuşalım.' } },
      { id: 'w_ball', word: 'ball', ipa: '/bɔːl/', spellingPattern: 'al', translation: { tr: 'top' }, exampleSentence: 'Throw the ball.', sentenceTranslation: { tr: 'Topu at.' } },
      { id: 'w_saw', word: 'saw', ipa: '/sɔː/', spellingPattern: 'aw', translation: { tr: 'gördü / testere' }, exampleSentence: 'I saw a rainbow.', sentenceTranslation: { tr: 'Bir gökkuşağı gördüm.' } },
      { id: 'w_port', word: 'port', ipa: '/pɔːt/', spellingPattern: 'or', translation: { tr: 'liman' }, exampleSentence: 'A busy port.', sentenceTranslation: { tr: 'Yoğun bir liman.' } },
      { id: 'w_fault', word: 'fault', ipa: '/fɔːlt/', spellingPattern: 'au', translation: { tr: 'hata / kusur' }, exampleSentence: 'It was my fault.', sentenceTranslation: { tr: 'Benim hatamdı.' } },
      { id: 'w_door', word: 'door', ipa: '/dɔːr/', spellingPattern: 'oor', translation: { tr: 'kapı' }, exampleSentence: 'Open the door.', sentenceTranslation: { tr: 'Kapıyı aç.' } },
      { id: 'w_thought', word: 'thought', ipa: '/θɔːt/', spellingPattern: 'ough', translation: { tr: 'düşünce' }, exampleSentence: 'A nice thought.', sentenceTranslation: { tr: 'Hoş bir düşünce.' } },
      { id: 'w_war', word: 'war', ipa: '/wɔːr/', spellingPattern: 'ar', translation: { tr: 'savaş' }, exampleSentence: 'Peace over war.', sentenceTranslation: { tr: 'Savaşa karşı barış.' } }
    ]
  },
  {
    id: 'ah-long-vowel',
    symbol: 'ɑː',
    exampleWord: 'glass',
    ipa: '/ɡlɑːs/',
    type: 'monophthongs',
    descriptionTr: 'Uzun "a" sesi.',
    descriptionEn: 'Long open back unrounded vowel.',
    spellingPatterns: [
      { spelling: 'ar', examples: ['car'] },
      { spelling: 'a', examples: ['father'] },
      { spelling: 'ear', examples: ['heart'] },
      { spelling: 'er', examples: ['clerk'] }
    ],
    words: [
      { id: 'w_glass', word: 'glass', ipa: '/ɡlɑːs/', spellingPattern: 'a', translation: { tr: 'bardak / cam' }, exampleSentence: 'A glass of water.', sentenceTranslation: { tr: 'Bir bardak su.' } },
      { id: 'w_car', word: 'car', ipa: '/kɑːr/', spellingPattern: 'ar', translation: { tr: 'araba' }, exampleSentence: 'Drive a car.', sentenceTranslation: { tr: 'Araba sür.' } },
      { id: 'w_father', word: 'father', ipa: '/ˈfɑːðər/', spellingPattern: 'a', translation: { tr: 'baba' }, exampleSentence: 'My father is wise.', sentenceTranslation: { tr: 'Babam bilgedir.' } },
      { id: 'w_heart', word: 'heart', ipa: '/hɑːt/', spellingPattern: 'ear', translation: { tr: 'kalp' }, exampleSentence: 'A kind heart.', sentenceTranslation: { tr: 'Nazik bir kalp.' } },
      { id: 'w_clerk', word: 'clerk', ipa: '/klɑːk/', spellingPattern: 'er', translation: { tr: 'tezgahtar / memur' }, exampleSentence: 'A store clerk.', sentenceTranslation: { tr: 'Mağaza görevlisi.' } }
    ]
  },

  // --- DIPHTHONGS ---
  {
    id: 'ay-diphthong',
    symbol: 'eɪ',
    exampleWord: 'pay',
    ipa: '/peɪ/',
    type: 'diphthongs',
    descriptionTr: '"e-i" kayma sesi.',
    descriptionEn: 'Diphthong starting from e moving to i.',
    spellingPatterns: [
      { spelling: 'a_e', examples: ['late'] },
      { spelling: 'ay', examples: ['pay'] },
      { spelling: 'ai', examples: ['rain'] },
      { spelling: 'ey', examples: ['they'] },
      { spelling: 'ei', examples: ['vein'] },
      { spelling: 'a', examples: ['baby'] }
    ],
    words: [
      { id: 'w_pay', word: 'pay', ipa: '/peɪ/', spellingPattern: 'ay', translation: { tr: 'ödemek' }, exampleSentence: 'Pay the bill.', sentenceTranslation: { tr: 'Faturayı öde.' } },
      { id: 'w_late', word: 'late', ipa: '/leɪt/', spellingPattern: 'a_e', translation: { tr: 'geç' }, exampleSentence: 'Don\'t be late.', sentenceTranslation: { tr: 'Geç kalma.' } },
      { id: 'w_rain', word: 'rain', ipa: '/reɪn/', spellingPattern: 'ai', translation: { tr: 'yağmur' }, exampleSentence: 'Heavy rain.', sentenceTranslation: { tr: 'Şiddetli yağmur.' } },
      { id: 'w_they', word: 'they', ipa: '/ðeɪ/', spellingPattern: 'ey', translation: { tr: 'onlar' }, exampleSentence: 'They are happy.', sentenceTranslation: { tr: 'Onlar mutlular.' } },
      { id: 'w_vein', word: 'vein', ipa: '/veɪn/', spellingPattern: 'ei', translation: { tr: 'damar' }, exampleSentence: 'Blood in veins.', sentenceTranslation: { tr: 'Damarlardaki kan.' } },
      { id: 'w_baby', word: 'baby', ipa: '/ˈbeɪbi/', spellingPattern: 'a', translation: { tr: 'bebek' }, exampleSentence: 'A sleeping baby.', sentenceTranslation: { tr: 'Uyuyan bir bebek.' } }
    ]
  },
  {
    id: 'oy-diphthong',
    symbol: 'ɔɪ',
    exampleWord: 'noise',
    ipa: '/nɔɪz/',
    type: 'diphthongs',
    descriptionTr: '"oy" sesi.',
    descriptionEn: 'Diphthong starting from o moving to i.',
    spellingPatterns: [
      { spelling: 'oi', examples: ['coin'] },
      { spelling: 'oy', examples: ['boy'] }
    ],
    words: [
      { id: 'w_noise', word: 'noise', ipa: '/nɔɪz/', spellingPattern: 'oi', translation: { tr: 'gürültü' }, exampleSentence: 'Loud noise.', sentenceTranslation: { tr: 'Yüksek gürültü.' } },
      { id: 'w_coin', word: 'coin', ipa: '/kɔɪn/', spellingPattern: 'oi', translation: { tr: 'madeni para' }, exampleSentence: 'A gold coin.', sentenceTranslation: { tr: 'Altın bir para.' } },
      { id: 'w_boy', word: 'boy', ipa: '/bɔɪ/', spellingPattern: 'oy', translation: { tr: 'erkek çocuk' }, exampleSentence: 'A young boy.', sentenceTranslation: { tr: 'Genç bir çocuk.' } }
    ]
  },
  {
    id: 'eye-diphthong',
    symbol: 'aɪ',
    exampleWord: 'fine',
    ipa: '/faɪn/',
    type: 'diphthongs',
    descriptionTr: '"a-i" kayma sesi.',
    descriptionEn: 'Diphthong starting from a moving to i.',
    spellingPatterns: [
      { spelling: 'i_e', examples: ['bike'] },
      { spelling: 'y', examples: ['fly'] },
      { spelling: 'ie', examples: ['pie'] },
      { spelling: 'i', examples: ['pilot'] },
      { spelling: 'uy', examples: ['buy'] },
      { spelling: 'igh', examples: ['high'] }
    ],
    words: [
      { id: 'w_fine', word: 'fine', ipa: '/faɪn/', spellingPattern: 'i_e', translation: { tr: 'iyi / ince' }, exampleSentence: 'I am fine.', sentenceTranslation: { tr: 'İyiyim.' } },
      { id: 'w_bike', word: 'bike', ipa: '/baɪk/', spellingPattern: 'i_e', translation: { tr: 'bisiklet' }, exampleSentence: 'Ride a bike.', sentenceTranslation: { tr: 'Bisiklete bin.' } },
      { id: 'w_fly', word: 'fly', ipa: '/flaɪ/', spellingPattern: 'y', translation: { tr: 'uçmak / sinek' }, exampleSentence: 'Birds fly high.', sentenceTranslation: { tr: 'Kuşlar yüksekte uçar.' } },
      { id: 'w_pie', word: 'pie', ipa: '/paɪ/', spellingPattern: 'ie', translation: { tr: 'turta' }, exampleSentence: 'Apple pie.', sentenceTranslation: { tr: 'Elmalı turta.' } },
      { id: 'w_pilot', word: 'pilot', ipa: '/ˈpaɪlət/', spellingPattern: 'i', translation: { tr: 'pilot' }, exampleSentence: 'An airline pilot.', sentenceTranslation: { tr: 'Bir havayolu pilotu.' } },
      { id: 'w_buy', word: 'buy', ipa: '/baɪ/', spellingPattern: 'uy', translation: { tr: 'satın almak' }, exampleSentence: 'Buy some milk.', sentenceTranslation: { tr: 'Biraz süt al.' } },
      { id: 'w_high', word: 'high', ipa: '/haɪ/', spellingPattern: 'igh', translation: { tr: 'yüksek' }, exampleSentence: 'Aim high.', sentenceTranslation: { tr: 'Yükseği hedefle.' } }
    ]
  },
  {
    id: 'oh-diphthong',
    symbol: 'əʊ',
    exampleWord: 'no',
    ipa: '/nəʊ/',
    type: 'diphthongs',
    descriptionTr: '"o-u" kayma sesi.',
    descriptionEn: 'Diphthong starting from schwa moving to u.',
    spellingPatterns: [
      { spelling: 'o_e', examples: ['note'] },
      { spelling: 'oa', examples: ['boat'] },
      { spelling: 'ow', examples: ['slow'] },
      { spelling: 'o', examples: ['go'] },
      { spelling: 'oe', examples: ['toe'] },
      { spelling: 'ou', examples: ['shoulder'] }
    ],
    words: [
      { id: 'w_no', word: 'no', ipa: '/nəʊ/', spellingPattern: 'o', translation: { tr: 'hayır' }, exampleSentence: 'Say no.', sentenceTranslation: { tr: 'Hayır de.' } },
      { id: 'w_note', word: 'note', ipa: '/nəʊt/', spellingPattern: 'o_e', translation: { tr: 'not' }, exampleSentence: 'Take a note.', sentenceTranslation: { tr: 'Bir not al.' } },
      { id: 'w_boat', word: 'boat', ipa: '/bəʊt/', spellingPattern: 'oa', translation: { tr: 'tekne' }, exampleSentence: 'A sailing boat.', sentenceTranslation: { tr: 'Yelkenli bir tekne.' } },
      { id: 'w_slow', word: 'slow', ipa: '/sləʊ/', spellingPattern: 'ow', translation: { tr: 'yavaş' }, exampleSentence: 'Drive slow.', sentenceTranslation: { tr: 'Yavaş sür.' } },
      { id: 'w_go', word: 'go', ipa: '/ɡəʊ/', spellingPattern: 'o', translation: { tr: 'gitmek' }, exampleSentence: 'Let\'s go.', sentenceTranslation: { tr: 'Hadi gidelim.' } },
      { id: 'w_toe', word: 'toe', ipa: '/təʊ/', spellingPattern: 'oe', translation: { tr: 'ayak parmağı' }, exampleSentence: 'Big toe.', sentenceTranslation: { tr: 'Ayak başparmağı.' } },
      { id: 'w_shoulder', word: 'shoulder', ipa: '/ˈʃəʊldər/', spellingPattern: 'ou', translation: { tr: 'omuz' }, exampleSentence: 'On my shoulder.', sentenceTranslation: { tr: 'Omuzumda.' } }
    ]
  },
  {
    id: 'ow-diphthong',
    symbol: 'aʊ',
    exampleWord: 'round',
    ipa: '/raʊnd/',
    type: 'diphthongs',
    descriptionTr: '"a-u" kayma sesi.',
    descriptionEn: 'Diphthong starting from a moving to u.',
    spellingPatterns: [
      { spelling: 'ou', examples: ['house'] },
      { spelling: 'ow', examples: ['cow'] }
    ],
    words: [
      { id: 'w_round', word: 'round', ipa: '/raʊnd/', spellingPattern: 'ou', translation: { tr: 'yuvarlak' }, exampleSentence: 'A round ball.', sentenceTranslation: { tr: 'Yuvarlak bir top.' } },
      { id: 'w_house', word: 'house', ipa: '/haʊs/', spellingPattern: 'ou', translation: { tr: 'ev' }, exampleSentence: 'A big house.', sentenceTranslation: { tr: 'Büyük bir ev.' } },
      { id: 'w_cow', word: 'cow', ipa: '/kaʊ/', spellingPattern: 'ow', translation: { tr: 'inek' }, exampleSentence: 'Milk from a cow.', sentenceTranslation: { tr: 'İnek sütü.' } }
    ]
  },
  {
    id: 'ear-diphthong',
    symbol: 'ɪə',
    exampleWord: 'beer',
    ipa: '/bɪər/',
    type: 'diphthongs',
    descriptionTr: '"i-ə" kayma sesi.',
    descriptionEn: 'Centering diphthong moving from i to schwa.',
    spellingPatterns: [
      { spelling: 'eer', examples: ['deer'] },
      { spelling: 'ear', examples: ['ear'] },
      { spelling: 'ere', examples: ['here'] },
      { spelling: 'ier', examples: ['fierce'] }
    ],
    words: [
      { id: 'w_beer', word: 'beer', ipa: '/bɪər/', spellingPattern: 'eer', translation: { tr: 'bira' }, exampleSentence: 'Cold beer.', sentenceTranslation: { tr: 'Soğuk bira.' } },
      { id: 'w_deer', word: 'deer', ipa: '/dɪər/', spellingPattern: 'eer', translation: { tr: 'geyik' }, exampleSentence: 'A wild deer.', sentenceTranslation: { tr: 'Vahşi bir geyik.' } },
      { id: 'w_ear', word: 'ear', ipa: '/ɪər/', spellingPattern: 'ear', translation: { tr: 'kulak' }, exampleSentence: 'Left ear.', sentenceTranslation: { tr: 'Sol kulak.' } },
      { id: 'w_here', word: 'here', ipa: '/hɪər/', spellingPattern: 'ere', translation: { tr: 'burada' }, exampleSentence: 'Come here.', sentenceTranslation: { tr: 'Buraya gel.' } },
      { id: 'w_fierce', word: 'fierce', ipa: '/fɪəs/', spellingPattern: 'ier', translation: { tr: 'şiddetli / vahşi' }, exampleSentence: 'A fierce tiger.', sentenceTranslation: { tr: 'Vahşi bir kaplan.' } }
    ]
  },
  {
    id: 'ea-diphthong',
    symbol: 'eə',
    exampleWord: 'care',
    ipa: '/keər/',
    type: 'diphthongs',
    descriptionTr: '"e-ə" kayma sesi.',
    descriptionEn: 'Centering diphthong moving from e to schwa.',
    spellingPatterns: [
      { spelling: 'air', examples: ['chair'] },
      { spelling: 'are', examples: ['care'] },
      { spelling: 'ear', examples: ['bear'] },
      { spelling: 'ere', examples: ['there'] }
    ],
    words: [
      { id: 'w_care_ea', word: 'care', ipa: '/keər/', spellingPattern: 'are', translation: { tr: 'bakım / özen' }, exampleSentence: 'Handle with care.', sentenceTranslation: { tr: 'Özenle taşıyın.' } },
      { id: 'w_chair', word: 'chair', ipa: '/tʃeər/', spellingPattern: 'air', translation: { tr: 'sandalye' }, exampleSentence: 'Sit on the chair.', sentenceTranslation: { tr: 'Sandalyeye otur.' } },
      { id: 'w_bear', word: 'bear', ipa: '/beər/', spellingPattern: 'ear', translation: { tr: 'ayı' }, exampleSentence: 'A brown bear.', sentenceTranslation: { tr: 'Kahverengi bir ayı.' } },
      { id: 'w_there', word: 'there', ipa: '/ðeər/', spellingPattern: 'ere', translation: { tr: 'orada' }, exampleSentence: 'Look over there.', sentenceTranslation: { tr: 'Orada bak.' } }
    ]
  },

  // --- CONSONANTS ---
  {
    id: 'p-consonant',
    symbol: 'p',
    exampleWord: 'pin',
    ipa: '/pɪn/',
    type: 'consonants_voiceless',
    descriptionTr: 'Sert "p" sessiz harfi.',
    descriptionEn: 'Voiceless bilabial plosive consonant.',
    spellingPatterns: [
      { spelling: 'p', examples: ['pen'] },
      { spelling: 'pp', examples: ['happy'] }
    ],
    words: [
      { id: 'w_pin', word: 'pin', ipa: '/pɪn/', spellingPattern: 'p', translation: { tr: 'iğne / raptiye' }, exampleSentence: 'A safety pin.', sentenceTranslation: { tr: 'Bir çengelli iğne.' } },
      { id: 'w_pen', word: 'pen', ipa: '/pen/', spellingPattern: 'p', translation: { tr: 'kalem' }, exampleSentence: 'Write with a pen.', sentenceTranslation: { tr: 'Kalemle yaz.' } },
      { id: 'w_happy_p', word: 'happy', ipa: '/ˈhæpi/', spellingPattern: 'pp', translation: { tr: 'mutlu' }, exampleSentence: 'Stay happy.', sentenceTranslation: { tr: 'Mutlu kal.' } }
    ]
  },
  {
    id: 'b-consonant',
    symbol: 'b',
    exampleWord: 'bag',
    ipa: '/bæɡ/',
    type: 'consonants_voiced',
    descriptionTr: 'Yumuşak "b" sessizi.',
    descriptionEn: 'Voiced bilabial plosive consonant.',
    spellingPatterns: [
      { spelling: 'b', examples: ['bag'] },
      { spelling: 'bb', examples: ['rubber'] }
    ],
    words: [
      { id: 'w_bag', word: 'bag', ipa: '/bæɡ/', spellingPattern: 'b', translation: { tr: 'çanta' }, exampleSentence: 'A travel bag.', sentenceTranslation: { tr: 'Bir seyahat çantası.' } },
      { id: 'w_rubber', word: 'rubber', ipa: '/ˈrʌbər/', spellingPattern: 'bb', translation: { tr: 'silgi / kauçuk' }, exampleSentence: 'A rubber eraser.', sentenceTranslation: { tr: 'Kauçuk bir silgi.' } }
    ]
  },
  {
    id: 't-consonant',
    symbol: 't',
    exampleWord: 'time',
    ipa: '/taɪm/',
    type: 'consonants_voiceless',
    descriptionTr: 'Sert "t" sessizi.',
    descriptionEn: 'Voiceless alveolar plosive consonant.',
    spellingPatterns: [
      { spelling: 't', examples: ['tea'] },
      { spelling: 'tt', examples: ['butter'] },
      { spelling: 'ed', examples: ['looked'] }
    ],
    words: [
      { id: 'w_time', word: 'time', ipa: '/taɪm/', spellingPattern: 't', translation: { tr: 'zaman' }, exampleSentence: 'What time is it?', sentenceTranslation: { tr: 'Saat kaç?' } },
      { id: 'w_tea', word: 'tea', ipa: '/tiː/', spellingPattern: 't', translation: { tr: 'çay' }, exampleSentence: 'A cup of tea.', sentenceTranslation: { tr: 'Bir fincan çay.' } },
      { id: 'w_butter', word: 'butter', ipa: '/ˈbʌtər/', spellingPattern: 'tt', translation: { tr: 'tereyağı' }, exampleSentence: 'Bread and butter.', sentenceTranslation: { tr: 'Ekmek ve tereyağı.' } },
      { id: 'w_looked', word: 'looked', ipa: '/lʊkt/', spellingPattern: 'ed', translation: { tr: 'baktı' }, exampleSentence: 'He looked at me.', sentenceTranslation: { tr: 'Bana baktı.' } }
    ]
  },
  {
    id: 'd-consonant',
    symbol: 'd',
    exampleWord: 'door',
    ipa: '/dɔːr/',
    type: 'consonants_voiced',
    descriptionTr: 'Yumuşak "d" sessizi.',
    descriptionEn: 'Voiced alveolar plosive consonant.',
    spellingPatterns: [
      { spelling: 'd', examples: ['dog'] },
      { spelling: 'dd', examples: ['add'] },
      { spelling: 'ed', examples: ['played'] }
    ],
    words: [
      { id: 'w_door_d', word: 'door', ipa: '/dɔːr/', spellingPattern: 'd', translation: { tr: 'kapı' }, exampleSentence: 'Lock the door.', sentenceTranslation: { tr: 'Kapıyı kilitle.' } },
      { id: 'w_dog', word: 'dog', ipa: '/dɒɡ/', spellingPattern: 'd', translation: { tr: 'köpek' }, exampleSentence: 'A loyal dog.', sentenceTranslation: { tr: 'Sadık bir köpek.' } },
      { id: 'w_add', word: 'add', ipa: '/æd/', spellingPattern: 'dd', translation: { tr: 'eklemek' }, exampleSentence: 'Add sugar.', sentenceTranslation: { tr: 'Şeker ekle.' } },
      { id: 'w_played', word: 'played', ipa: '/pleɪd/', spellingPattern: 'ed', translation: { tr: 'oynadı' }, exampleSentence: 'We played games.', sentenceTranslation: { tr: 'Oyunlar oynadık.' } }
    ]
  },
  {
    id: 'k-consonant',
    symbol: 'k',
    exampleWord: 'cash',
    ipa: '/kæʃ/',
    type: 'consonants_voiceless',
    descriptionTr: 'Sert "k" sessizi.',
    descriptionEn: 'Voiceless velar plosive consonant.',
    spellingPatterns: [
      { spelling: 'c', examples: ['cat'] },
      { spelling: 'k', examples: ['kite'] },
      { spelling: 'ck', examples: ['duck'] },
      { spelling: 'ch', examples: ['school'] },
      { spelling: 'q', examples: ['queen'] },
      { spelling: 'x', examples: ['box'] }
    ],
    words: [
      { id: 'w_cash', word: 'cash', ipa: '/kæʃ/', spellingPattern: 'c', translation: { tr: 'nakit para' }, exampleSentence: 'Pay in cash.', sentenceTranslation: { tr: 'Nakit öde.' } },
      { id: 'w_cat_k', word: 'cat', ipa: '/kæt/', spellingPattern: 'c', translation: { tr: 'kedi' }, exampleSentence: 'Feed the cat.', sentenceTranslation: { tr: 'Kediyi besle.' } },
      { id: 'w_kite', word: 'kite', ipa: '/kaɪt/', spellingPattern: 'k', translation: { tr: 'uçurtma' }, exampleSentence: 'Fly a kite.', sentenceTranslation: { tr: 'Uçurtma uçur.' } },
      { id: 'w_duck', word: 'duck', ipa: '/dʌk/', spellingPattern: 'ck', translation: { tr: 'ördek' }, exampleSentence: 'A yellow duck.', sentenceTranslation: { tr: 'Sarı bir ördek.' } },
      { id: 'w_school', word: 'school', ipa: '/skuːl/', spellingPattern: 'ch', translation: { tr: 'okul' }, exampleSentence: 'Go to school.', sentenceTranslation: { tr: 'Okula git.' } },
      { id: 'w_queen', word: 'queen', ipa: '/kwiːn/', spellingPattern: 'q', translation: { tr: 'kraliçe' }, exampleSentence: 'A royal queen.', sentenceTranslation: { tr: 'Kraliyet kraliçesi.' } },
      { id: 'w_box', word: 'box', ipa: '/bɒks/', spellingPattern: 'x', translation: { tr: 'kutu' }, exampleSentence: 'Open the box.', sentenceTranslation: { tr: 'Kutuyu aç.' } }
    ]
  },
  {
    id: 'g-consonant',
    symbol: 'g',
    exampleWord: 'girl',
    ipa: '/ɡɜːl/',
    type: 'consonants_voiced',
    descriptionTr: 'Yumuşak "g" sessizi.',
    descriptionEn: 'Voiced velar plosive consonant.',
    spellingPatterns: [
      { spelling: 'g', examples: ['girl'] },
      { spelling: 'gg', examples: ['egg'] },
      { spelling: 'gh', examples: ['ghost'] },
      { spelling: 'gu', examples: ['guard'] }
    ],
    words: [
      { id: 'w_girl_g', word: 'girl', ipa: '/ɡɜːl/', spellingPattern: 'g', translation: { tr: 'kız çocuğu' }, exampleSentence: 'A smart girl.', sentenceTranslation: { tr: 'Zeki bir kız.' } },
      { id: 'w_egg', word: 'egg', ipa: '/eɡ/', spellingPattern: 'gg', translation: { tr: 'yumurta' }, exampleSentence: 'A boiled egg.', sentenceTranslation: { tr: 'Haşlanmış yumurta.' } },
      { id: 'w_ghost', word: 'ghost', ipa: '/ɡəʊst/', spellingPattern: 'gh', translation: { tr: 'hayalet' }, exampleSentence: 'A friendly ghost.', sentenceTranslation: { tr: 'Dost canlısı bir hayalet.' } },
      { id: 'w_guard', word: 'guard', ipa: '/ɡɑːd/', spellingPattern: 'gu', translation: { tr: 'koruma / muhafız' }, exampleSentence: 'Security guard.', sentenceTranslation: { tr: 'Güvenlik görevlisi.' } }
    ]
  },
  {
    id: 'glottal-stop',
    symbol: 'ʔ',
    exampleWord: 'football',
    ipa: '/ˈfʊʔbɔːl/',
    type: 'consonants_voiceless',
    descriptionTr: 'Glottal Stop (Gırtlak kesilme sesi).',
    descriptionEn: 'Glottal stop consonant articulation.',
    spellingPatterns: [
      { spelling: 't', examples: ['football', 'hat'] }
    ],
    words: [
      { id: 'w_football', word: 'football', ipa: '/ˈfʊʔbɔːl/', spellingPattern: 't', translation: { tr: 'futbol' }, exampleSentence: 'Play football.', sentenceTranslation: { tr: 'Futbol oyna.' } },
      { id: 'w_hat_glottal', word: 'hat', ipa: '/hæʔ/', spellingPattern: 't', translation: { tr: 'şapka' }, exampleSentence: 'Wear a hat.', sentenceTranslation: { tr: 'Şapka giy.' } }
    ]
  },
  {
    id: 'f-consonant',
    symbol: 'f',
    exampleWord: 'full',
    ipa: '/fʊl/',
    type: 'consonants_voiceless',
    descriptionTr: 'Sert "f" sessizi.',
    descriptionEn: 'Voiceless labiodental fricative consonant.',
    spellingPatterns: [
      { spelling: 'f', examples: ['fish'] },
      { spelling: 'ff', examples: ['coffee'] },
      { spelling: 'ph', examples: ['phone'] },
      { spelling: 'gh', examples: ['laugh'] }
    ],
    words: [
      { id: 'w_full_f', word: 'full', ipa: '/fʊl/', spellingPattern: 'f', translation: { tr: 'dolu' }, exampleSentence: 'Full cup.', sentenceTranslation: { tr: 'Dolu fincan.' } },
      { id: 'w_fish', word: 'fish', ipa: '/fɪʃ/', spellingPattern: 'f', translation: { tr: 'balık' }, exampleSentence: 'Fresh fish.', sentenceTranslation: { tr: 'Taze balık.' } },
      { id: 'w_coffee_f', word: 'coffee', ipa: '/ˈkɒfi/', spellingPattern: 'ff', translation: { tr: 'kahve' }, exampleSentence: 'Hot coffee.', sentenceTranslation: { tr: 'Sıcak kahve.' } },
      { id: 'w_phone', word: 'phone', ipa: '/fəʊn/', spellingPattern: 'ph', translation: { tr: 'telefon' }, exampleSentence: 'Answer the phone.', sentenceTranslation: { tr: 'Telefona cevap ver.' } },
      { id: 'w_laugh_f', word: 'laugh', ipa: '/lɑːf/', spellingPattern: 'gh', translation: { tr: 'gülmek' }, exampleSentence: 'Laugh loudly.', sentenceTranslation: { tr: 'Yüksek sesle gül.' } }
    ]
  },
  {
    id: 'v-consonant',
    symbol: 'v',
    exampleWord: 'vest',
    ipa: '/vest/',
    type: 'consonants_voiced',
    descriptionTr: 'Yumuşak "v" sessizi.',
    descriptionEn: 'Voiced labiodental fricative consonant.',
    spellingPatterns: [
      { spelling: 'v', examples: ['van'] },
      { spelling: 'f', examples: ['of'] },
      { spelling: 've', examples: ['have'] }
    ],
    words: [
      { id: 'w_vest', word: 'vest', ipa: '/vest/', spellingPattern: 'v', translation: { tr: 'yelek' }, exampleSentence: 'A warm vest.', sentenceTranslation: { tr: 'Sıcak bir yelek.' } },
      { id: 'w_van', word: 'van', ipa: '/væn/', spellingPattern: 'v', translation: { tr: 'minibüs / kamyonet' }, exampleSentence: 'Drive a van.', sentenceTranslation: { tr: 'Minibüs sür.' } },
      { id: 'w_of', word: 'of', ipa: '/ɒv/', spellingPattern: 'f', translation: { tr: '-in / -ın' }, exampleSentence: 'Cup of water.', sentenceTranslation: { tr: 'Bir bardak su.' } },
      { id: 'w_have', word: 'have', ipa: '/hæv/', spellingPattern: 've', translation: { tr: 'sahip olmak' }, exampleSentence: 'Have a nice day.', sentenceTranslation: { tr: 'İyi günler.' } }
    ]
  },
  {
    id: 'th-voiceless',
    symbol: 'θ',
    exampleWord: 'think',
    ipa: '/θɪŋk/',
    type: 'consonants_voiceless',
    descriptionTr: 'Pelteksiz sert "th" sesi.',
    descriptionEn: 'Voiceless dental fricative consonant.',
    spellingPatterns: [
      { spelling: 'th', examples: ['think', 'bath'] }
    ],
    words: [
      { id: 'w_think', word: 'think', ipa: '/θɪŋk/', spellingPattern: 'th', translation: { tr: 'düşünmek' }, exampleSentence: 'Think twice.', sentenceTranslation: { tr: 'İki kez düşün.' } },
      { id: 'w_bath', word: 'bath', ipa: '/bɑːθ/', spellingPattern: 'th', translation: { tr: 'banyo' }, exampleSentence: 'Take a bath.', sentenceTranslation: { tr: 'Banyo yap.' } }
    ]
  },
  {
    id: 'th-voiced',
    symbol: 'ð',
    exampleWord: 'those',
    ipa: '/ðəʊz/',
    type: 'consonants_voiced',
    descriptionTr: 'Pelteksiz yumuşak "th" sesi.',
    descriptionEn: 'Voiced dental fricative consonant.',
    spellingPatterns: [
      { spelling: 'th', examples: ['this', 'mother'] }
    ],
    words: [
      { id: 'w_those', word: 'those', ipa: '/ðəʊz/', spellingPattern: 'th', translation: { tr: 'şunlar / onlar' }, exampleSentence: 'Those books.', sentenceTranslation: { tr: 'Şu kitaplar.' } },
      { id: 'w_this', word: 'this', ipa: '/ðɪs/', spellingPattern: 'th', translation: { tr: 'bu' }, exampleSentence: 'This is good.', sentenceTranslation: { tr: 'Bu iyi.' } },
      { id: 'w_mother', word: 'mother', ipa: '/ˈmʌðər/', spellingPattern: 'th', translation: { tr: 'anne' }, exampleSentence: 'A caring mother.', sentenceTranslation: { tr: 'Şefkatli bir anne.' } }
    ]
  },
  {
    id: 's-consonant',
    symbol: 's',
    exampleWord: 'sight',
    ipa: '/saɪt/',
    type: 'consonants_voiceless',
    descriptionTr: 'Sert "s" sessizi.',
    descriptionEn: 'Voiceless alveolar fricative consonant.',
    spellingPatterns: [
      { spelling: 's', examples: ['see'] },
      { spelling: 'ss', examples: ['miss'] },
      { spelling: 'c', examples: ['city'] },
      { spelling: 'sc', examples: ['science'] },
      { spelling: 'x', examples: ['fix'] }
    ],
    words: [
      { id: 'w_sight', word: 'sight', ipa: '/saɪt/', spellingPattern: 's', translation: { tr: 'görüş / manzara' }, exampleSentence: 'A wonderful sight.', sentenceTranslation: { tr: 'Harika bir manzara.' } },
      { id: 'w_see_s', word: 'see', ipa: '/siː/', spellingPattern: 's', translation: { tr: 'görmek' }, exampleSentence: 'I see.', sentenceTranslation: { tr: 'Anlıyorum / Görüyorum.' } },
      { id: 'w_miss', word: 'miss', ipa: '/mɪs/', spellingPattern: 'ss', translation: { tr: 'özlemek / kaçırmak' }, exampleSentence: 'Don\'t miss the train.', sentenceTranslation: { tr: 'Treni kaçırma.' } },
      { id: 'w_city_s', word: 'city', ipa: '/ˈsɪti/', spellingPattern: 'c', translation: { tr: 'şehir' }, exampleSentence: 'A big city.', sentenceTranslation: { tr: 'Büyük bir şehir.' } },
      { id: 'w_science', word: 'science', ipa: '/ˈsaɪəns/', spellingPattern: 'sc', translation: { tr: 'bilim' }, exampleSentence: 'Science and tech.', sentenceTranslation: { tr: 'Bilim ve teknoloji.' } },
      { id: 'w_fix', word: 'fix', ipa: '/fɪks/', spellingPattern: 'x', translation: { tr: 'tamir etmek' }, exampleSentence: 'Fix the car.', sentenceTranslation: { tr: 'Arabayı tamir et.' } }
    ]
  },
  {
    id: 'z-consonant',
    symbol: 'z',
    exampleWord: 'zoo',
    ipa: '/zuː/',
    type: 'consonants_voiced',
    descriptionTr: 'Yumuşak "z" sessizi.',
    descriptionEn: 'Voiced alveolar fricative consonant.',
    spellingPatterns: [
      { spelling: 'z', examples: ['zoo'] },
      { spelling: 'zz', examples: ['buzz'] },
      { spelling: 's', examples: ['is'] },
      { spelling: 'x', examples: ['exam'] }
    ],
    words: [
      { id: 'w_zoo', word: 'zoo', ipa: '/zuː/', spellingPattern: 'z', translation: { tr: 'hayvanat bahçesi' }, exampleSentence: 'Visit the zoo.', sentenceTranslation: { tr: 'Hayvanat bahçesini ziyaret et.' } },
      { id: 'w_buzz', word: 'buzz', ipa: '/bʌz/', spellingPattern: 'zz', translation: { tr: 'vızıltı' }, exampleSentence: 'Bees buzz.', sentenceTranslation: { tr: 'Arılar vızıldar.' } },
      { id: 'w_is', word: 'is', ipa: '/ɪz/', spellingPattern: 's', translation: { tr: '-dir / -dır' }, exampleSentence: 'This is easy.', sentenceTranslation: { tr: 'Bu kolay.' } },
      { id: 'w_exam', word: 'exam', ipa: '/ɪɡˈzæm/', spellingPattern: 'x', translation: { tr: 'sınav' }, exampleSentence: 'Pass the exam.', sentenceTranslation: { tr: 'Sınavı geç.' } }
    ]
  },
  {
    id: 'sh-consonant',
    symbol: 'ʃ',
    exampleWord: 'shirt',
    ipa: '/ʃɜːt/',
    type: 'consonants_voiceless',
    descriptionTr: '"ş" sesi.',
    descriptionEn: 'Voiceless postalveolar fricative consonant.',
    spellingPatterns: [
      { spelling: 'sh', examples: ['shoe'] },
      { spelling: 'ch', examples: ['chef'] },
      { spelling: 'ti', examples: ['station'] },
      { spelling: 'ci', examples: ['special'] },
      { spelling: 's', examples: ['sure'] },
      { spelling: 'ss', examples: ['mission'] }
    ],
    words: [
      { id: 'w_shirt', word: 'shirt', ipa: '/ʃɜːt/', spellingPattern: 'sh', translation: { tr: 'gömlek' }, exampleSentence: 'A clean shirt.', sentenceTranslation: { tr: 'Temiz bir gömlek.' } },
      { id: 'w_shoe', word: 'shoe', ipa: '/ʃuː/', spellingPattern: 'sh', translation: { tr: 'ayakkabı' }, exampleSentence: 'Put on your shoes.', sentenceTranslation: { tr: 'Ayakkabılarını giy.' } },
      { id: 'w_chef', word: 'chef', ipa: '/ʃef/', spellingPattern: 'ch', translation: { tr: 'aşçı' }, exampleSentence: 'A skilled chef.', sentenceTranslation: { tr: 'Yetenekli bir aşçı.' } },
      { id: 'w_station', word: 'station', ipa: '/ˈsteɪʃn/', spellingPattern: 'ti', translation: { tr: 'istasyon' }, exampleSentence: 'Train station.', sentenceTranslation: { tr: 'Tren istasyonu.' } },
      { id: 'w_special', word: 'special', ipa: '/ˈspeʃl/', spellingPattern: 'ci', translation: { tr: 'özel' }, exampleSentence: 'A special day.', sentenceTranslation: { tr: 'Özel bir gün.' } },
      { id: 'w_sure', word: 'sure', ipa: '/ʃɔːr/', spellingPattern: 's', translation: { tr: 'emin' }, exampleSentence: 'Are you sure?', sentenceTranslation: { tr: 'Emin misin?' } },
      { id: 'w_mission', word: 'mission', ipa: '/ˈmɪʃn/', spellingPattern: 'ss', translation: { tr: 'görev' }, exampleSentence: 'Mission accomplished.', sentenceTranslation: { tr: 'Görev tamamlandı.' } }
    ]
  },
  {
    id: 'zh-consonant',
    symbol: 'ʒ',
    exampleWord: 'pleasure',
    ipa: '/ˈpleʒər/',
    type: 'consonants_voiced',
    descriptionTr: 'Yumuşak "j" sesi.',
    descriptionEn: 'Voiced postalveolar fricative consonant.',
    spellingPatterns: [
      { spelling: 's', examples: ['treasure'] },
      { spelling: 'si', examples: ['division'] },
      { spelling: 'ge', examples: ['beige'] }
    ],
    words: [
      { id: 'w_pleasure', word: 'pleasure', ipa: '/ˈpleʒər/', spellingPattern: 's', translation: { tr: 'zevk / memnuniyet' }, exampleSentence: 'My pleasure.', sentenceTranslation: { tr: 'Benim için bir zevk.' } },
      { id: 'w_treasure', word: 'treasure', ipa: '/ˈtreʒər/', spellingPattern: 's', translation: { tr: 'hazine' }, exampleSentence: 'Hidden treasure.', sentenceTranslation: { tr: 'Gizli hazine.' } },
      { id: 'w_division', word: 'division', ipa: '/dɪˈvɪʒn/', spellingPattern: 'si', translation: { tr: 'bölüm / bölme' }, exampleSentence: 'Cell division.', sentenceTranslation: { tr: 'Hücre bölünmesi.' } },
      { id: 'w_beige', word: 'beige', ipa: '/beɪʒ/', spellingPattern: 'ge', translation: { tr: 'bej rengi' }, exampleSentence: 'A beige sofa.', sentenceTranslation: { tr: 'Bej bir koltuk.' } }
    ]
  },
  {
    id: 'h-consonant',
    symbol: 'h',
    exampleWord: 'high',
    ipa: '/haɪ/',
    type: 'consonants_voiceless',
    descriptionTr: 'Nefesli "h" sesi.',
    descriptionEn: 'Voiceless glottal fricative consonant.',
    spellingPatterns: [
      { spelling: 'h', examples: ['hat'] },
      { spelling: 'wh', examples: ['who'] }
    ],
    words: [
      { id: 'w_high_h', word: 'high', ipa: '/haɪ/', spellingPattern: 'h', translation: { tr: 'yüksek' }, exampleSentence: 'High mountains.', sentenceTranslation: { tr: 'Yüksek dağlar.' } },
      { id: 'w_hat_h', word: 'hat', ipa: '/hæt/', spellingPattern: 'h', translation: { tr: 'şapka' }, exampleSentence: 'A red hat.', sentenceTranslation: { tr: 'Kırmızı bir şapka.' } },
      { id: 'w_who', word: 'who', ipa: '/huː/', spellingPattern: 'wh', translation: { tr: 'kim' }, exampleSentence: 'Who is there?', sentenceTranslation: { tr: 'Kim var orada?' } }
    ]
  },
  {
    id: 'ch-consonant',
    symbol: 'tʃ',
    exampleWord: 'chose',
    ipa: '/tʃəʊz/',
    type: 'consonants_voiceless',
    descriptionTr: '"ç" sesi.',
    descriptionEn: 'Voiceless postalveolar affricate consonant.',
    spellingPatterns: [
      { spelling: 'ch', examples: ['chair'] },
      { spelling: 'tch', examples: ['catch'] },
      { spelling: 't', examples: ['nature'] },
      { spelling: 'tu', examples: ['future'] }
    ],
    words: [
      { id: 'w_chose', word: 'chose', ipa: '/tʃəʊz/', spellingPattern: 'ch', translation: { tr: 'seçti' }, exampleSentence: 'He chose well.', sentenceTranslation: { tr: 'İyi seçti.' } },
      { id: 'w_chair_ch', word: 'chair', ipa: '/tʃeər/', spellingPattern: 'ch', translation: { tr: 'sandalye' }, exampleSentence: 'A wooden chair.', sentenceTranslation: { tr: 'Ahşap bir sandalye.' } },
      { id: 'w_catch', word: 'catch', ipa: '/kætʃ/', spellingPattern: 'tch', translation: { tr: 'yakalamak' }, exampleSentence: 'Catch the ball.', sentenceTranslation: { tr: 'Topu yakala.' } },
      { id: 'w_nature', word: 'nature', ipa: '/ˈneɪtʃər/', spellingPattern: 't', translation: { tr: 'doğa' }, exampleSentence: 'Protect nature.', sentenceTranslation: { tr: 'Doğayı koru.' } },
      { id: 'w_future', word: 'future', ipa: '/ˈfjuːtʃər/', spellingPattern: 'tu', translation: { tr: 'gelecek' }, exampleSentence: 'A bright future.', sentenceTranslation: { tr: 'Parlak bir gelecek.' } }
    ]
  },
  {
    id: 'j-consonant',
    symbol: 'dʒ',
    exampleWord: 'joy',
    ipa: '/dʒɔɪ/',
    type: 'consonants_voiced',
    descriptionTr: '"c" sesi.',
    descriptionEn: 'Voiced postalveolar affricate consonant.',
    spellingPatterns: [
      { spelling: 'j', examples: ['jelly'] },
      { spelling: 'g', examples: ['gem'] },
      { spelling: 'dg', examples: ['bridge'] },
      { spelling: 'd', examples: ['soldier'] },
      { spelling: 'di', examples: ['educate'] }
    ],
    words: [
      { id: 'w_joy_j', word: 'joy', ipa: '/dʒɔɪ/', spellingPattern: 'j', translation: { tr: 'sevinç' }, exampleSentence: 'Pure joy.', sentenceTranslation: { tr: 'Saf sevinç.' } },
      { id: 'w_jelly', word: 'jelly', ipa: '/ˈdʒeli/', spellingPattern: 'j', translation: { tr: 'jöle' }, exampleSentence: 'Fruit jelly.', sentenceTranslation: { tr: 'Meyveli jöle.' } },
      { id: 'w_gem', word: 'gem', ipa: '/dʒem/', spellingPattern: 'g', translation: { tr: 'mücevher' }, exampleSentence: 'A rare gem.', sentenceTranslation: { tr: 'Nadir bir mücevher.' } },
      { id: 'w_bridge', word: 'bridge', ipa: '/brɪdʒ/', spellingPattern: 'dg', translation: { tr: 'köprü' }, exampleSentence: 'Cross the bridge.', sentenceTranslation: { tr: 'Köprüyü geç.' } },
      { id: 'w_soldier', word: 'soldier', ipa: '/ˈsəʊldʒər/', spellingPattern: 'd', translation: { tr: 'asker' }, exampleSentence: 'A brave soldier.', sentenceTranslation: { tr: 'Cesur bir asker.' } },
      { id: 'w_educate', word: 'educate', ipa: '/ˈedʒukeɪt/', spellingPattern: 'di', translation: { tr: 'eğitmek' }, exampleSentence: 'Educate young minds.', sentenceTranslation: { tr: 'Genç zihinleri eğit.' } }
    ]
  },
  {
    id: 'm-consonant',
    symbol: 'm',
    exampleWord: 'mood',
    ipa: '/muːd/',
    type: 'consonants_voiced',
    descriptionTr: 'Yumuşak "m" geniz sesi.',
    descriptionEn: 'Voiced bilabial nasal consonant.',
    spellingPatterns: [
      { spelling: 'm', examples: ['man'] },
      { spelling: 'mm', examples: ['hammer'] },
      { spelling: 'mb', examples: ['lamb'] },
      { spelling: 'mn', examples: ['autumn'] }
    ],
    words: [
      { id: 'w_mood', word: 'mood', ipa: '/muːd/', spellingPattern: 'm', translation: { tr: 'ruh hali' }, exampleSentence: 'In a good mood.', sentenceTranslation: { tr: 'İyi bir ruh halinde.' } },
      { id: 'w_man_m', word: 'man', ipa: '/mæn/', spellingPattern: 'm', translation: { tr: 'adam' }, exampleSentence: 'A wise man.', sentenceTranslation: { tr: 'Bilge bir adam.' } },
      { id: 'w_hammer', word: 'hammer', ipa: '/ˈhæmər/', spellingPattern: 'mm', translation: { tr: 'çekiç' }, exampleSentence: 'A heavy hammer.', sentenceTranslation: { tr: 'Ağır bir çekiç.' } },
      { id: 'w_lamb', word: 'lamb', ipa: '/læm/', spellingPattern: 'mb', translation: { tr: 'kuzu' }, exampleSentence: 'A little lamb.', sentenceTranslation: { tr: 'Küçük bir kuzu.' } },
      { id: 'w_autumn', word: 'autumn', ipa: '/ˈɔːtəm/', spellingPattern: 'mn', translation: { tr: 'sonbahar' }, exampleSentence: 'Leaves fall in autumn.', sentenceTranslation: { tr: 'Sonbaharda yapraklar dökülür.' } }
    ]
  },
  {
    id: 'n-consonant',
    symbol: 'n',
    exampleWord: 'now',
    ipa: '/naʊ/',
    type: 'consonants_voiced',
    descriptionTr: 'Yumuşak "n" sesi.',
    descriptionEn: 'Voiced alveolar nasal consonant.',
    spellingPatterns: [
      { spelling: 'n', examples: ['net'] },
      { spelling: 'nn', examples: ['dinner'] },
      { spelling: 'kn', examples: ['know'] },
      { spelling: 'gn', examples: ['sign'] },
      { spelling: 'pn', examples: ['pneumonia'] }
    ],
    words: [
      { id: 'w_now_n', word: 'now', ipa: '/naʊ/', spellingPattern: 'n', translation: { tr: 'şimdi' }, exampleSentence: 'Right now.', sentenceTranslation: { tr: 'Tam şimdi.' } },
      { id: 'w_net', word: 'net', ipa: '/net/', spellingPattern: 'n', translation: { tr: 'ağ' }, exampleSentence: 'A fishing net.', sentenceTranslation: { tr: 'Bir balık ağı.' } },
      { id: 'w_dinner', word: 'dinner', ipa: '/ˈdɪnər/', spellingPattern: 'nn', translation: { tr: 'akşam yemeği' }, exampleSentence: 'Cook dinner.', sentenceTranslation: { tr: 'Akşam yemeği pişir.' } },
      { id: 'w_know', word: 'know', ipa: '/nəʊ/', spellingPattern: 'kn', translation: { tr: 'bilmek' }, exampleSentence: 'I know the answer.', sentenceTranslation: { tr: 'Cevabı biliyorum.' } },
      { id: 'w_sign', word: 'sign', ipa: '/saɪn/', spellingPattern: 'gn', translation: { tr: 'tabela / imza' }, exampleSentence: 'Sign the paper.', sentenceTranslation: { tr: 'Kağıdı imzala.' } },
      { id: 'w_pneumonia', word: 'pneumonia', ipa: '/njuːˈməʊniə/', spellingPattern: 'pn', translation: { tr: 'zatürre' }, exampleSentence: 'Treat pneumonia.', sentenceTranslation: { tr: 'Zatürreyi tedavi et.' } }
    ]
  },
  {
    id: 'ng-consonant',
    symbol: 'ŋ',
    exampleWord: 'bang',
    ipa: '/bæŋ/',
    type: 'consonants_voiced',
    descriptionTr: 'Geniz "ng" sesi.',
    descriptionEn: 'Voiced velar nasal consonant.',
    spellingPatterns: [
      { spelling: 'ng', examples: ['sing'] },
      { spelling: 'n', examples: ['pink'] }
    ],
    words: [
      { id: 'w_bang', word: 'bang', ipa: '/bæŋ/', spellingPattern: 'ng', translation: { tr: 'güm sesi' }, exampleSentence: 'A loud bang.', sentenceTranslation: { tr: 'Yüksek bir güm sesi.' } },
      { id: 'w_sing', word: 'sing', ipa: '/sɪŋ/', spellingPattern: 'ng', translation: { tr: 'şarkı söylemek' }, exampleSentence: 'Sing a song.', sentenceTranslation: { tr: 'Şarkı söyle.' } },
      { id: 'w_pink', word: 'pink', ipa: '/pɪŋk/', spellingPattern: 'n', translation: { tr: 'pembe' }, exampleSentence: 'A pink rose.', sentenceTranslation: { tr: 'Pembe bir gül.' } }
    ]
  },
  {
    id: 'w-consonant',
    symbol: 'w',
    exampleWord: 'wall',
    ipa: '/wɔːl/',
    type: 'consonants_voiced',
    descriptionTr: '"w" sesi.',
    descriptionEn: 'Voiced labial-velar approximant consonant.',
    spellingPatterns: [
      { spelling: 'w', examples: ['water'] },
      { spelling: 'wh', examples: ['what'] },
      { spelling: 'u', examples: ['quick'] }
    ],
    words: [
      { id: 'w_wall', word: 'wall', ipa: '/wɔːl/', spellingPattern: 'w', translation: { tr: 'duvar' }, exampleSentence: 'A high wall.', sentenceTranslation: { tr: 'Yüksek bir duvar.' } },
      { id: 'w_water', word: 'water', ipa: '/ˈwɔːtər/', spellingPattern: 'w', translation: { tr: 'su' }, exampleSentence: 'Drink fresh water.', sentenceTranslation: { tr: 'Taze su iç.' } },
      { id: 'w_what', word: 'what', ipa: '/wɒt/', spellingPattern: 'wh', translation: { tr: 'ne' }, exampleSentence: 'What is this?', sentenceTranslation: { tr: 'Bu nedir?' } },
      { id: 'w_quick_w', word: 'quick', ipa: '/kwɪk/', spellingPattern: 'u', translation: { tr: 'hızlı' }, exampleSentence: 'Be quick.', sentenceTranslation: { tr: 'Hızlı ol.' } }
    ]
  },
  {
    id: 'y-consonant',
    symbol: 'j',
    exampleWord: 'yellow',
    ipa: '/ˈjeləʊ/',
    type: 'consonants_voiced',
    descriptionTr: '"y" sesi.',
    descriptionEn: 'Voiced palatal approximant consonant.',
    spellingPatterns: [
      { spelling: 'y', examples: ['yes'] },
      { spelling: 'i', examples: ['onion'] },
      { spelling: 'u', examples: ['cute'] }
    ],
    words: [
      { id: 'w_yellow', word: 'yellow', ipa: '/ˈjeləʊ/', spellingPattern: 'y', translation: { tr: 'sarı' }, exampleSentence: 'A yellow sun.', sentenceTranslation: { tr: 'Sarı bir güneş.' } },
      { id: 'w_yes', word: 'yes', ipa: '/jes/', spellingPattern: 'y', translation: { tr: 'evet' }, exampleSentence: 'Say yes.', sentenceTranslation: { tr: 'Evet de.' } },
      { id: 'w_onion', word: 'onion', ipa: '/ˈʌnjən/', spellingPattern: 'i', translation: { tr: 'soğan' }, exampleSentence: 'Chop the onion.', sentenceTranslation: { tr: 'Soğanı doğra.' } },
      { id: 'w_cute', word: 'cute', ipa: '/kjuːt/', spellingPattern: 'u', translation: { tr: 'sevimli' }, exampleSentence: 'A cute puppy.', sentenceTranslation: { tr: 'Sevimli bir köpek yavrusu.' } }
    ]
  },
  {
    id: 'r-consonant',
    symbol: 'r',
    exampleWord: 'room',
    ipa: '/ruːm/',
    type: 'consonants_voiced',
    descriptionTr: '"r" sesi.',
    descriptionEn: 'Voiced alveolar approximant consonant.',
    spellingPatterns: [
      { spelling: 'r', examples: ['red'] },
      { spelling: 'rr', examples: ['carrot'] },
      { spelling: 'wr', examples: ['write'] }
    ],
    words: [
      { id: 'w_room', word: 'room', ipa: '/ruːm/', spellingPattern: 'r', translation: { tr: 'oda' }, exampleSentence: 'A quiet room.', sentenceTranslation: { tr: 'Sessiz bir oda.' } },
      { id: 'w_red_r', word: 'red', ipa: '/red/', spellingPattern: 'r', translation: { tr: 'kırmızı' }, exampleSentence: 'A red rose.', sentenceTranslation: { tr: 'Kırmızı bir gül.' } },
      { id: 'w_carrot_r', word: 'carrot', ipa: '/ˈkærət/', spellingPattern: 'rr', translation: { tr: 'havuç' }, exampleSentence: 'Fresh carrot.', sentenceTranslation: { tr: 'Taze havuç.' } },
      { id: 'w_write', word: 'write', ipa: '/raɪt/', spellingPattern: 'wr', translation: { tr: 'yazmak' }, exampleSentence: 'Write a letter.', sentenceTranslation: { tr: 'Bir mektup yaz.' } }
    ]
  },
  {
    id: 'l-consonant',
    symbol: 'l',
    exampleWord: 'law',
    ipa: '/lɔː/',
    type: 'consonants_voiced',
    descriptionTr: 'Açık "l" sesi.',
    descriptionEn: 'Voiced alveolar lateral approximant consonant.',
    spellingPatterns: [
      { spelling: 'l', examples: ['leg'] },
      { spelling: 'll', examples: ['ball'] }
    ],
    words: [
      { id: 'w_law', word: 'law', ipa: '/lɔː/', spellingPattern: 'l', translation: { tr: 'kanun / hobi' }, exampleSentence: 'Follow the law.', sentenceTranslation: { tr: 'Kanunlara uy.' } },
      { id: 'w_leg', word: 'leg', ipa: '/leg/', spellingPattern: 'l', translation: { tr: 'bacak' }, exampleSentence: 'My leg hurts.', sentenceTranslation: { tr: 'Bacağım ağrıyor.' } },
      { id: 'w_ball_l', word: 'ball', ipa: '/bɔːl/', spellingPattern: 'll', translation: { tr: 'top' }, exampleSentence: 'Kick the ball.', sentenceTranslation: { tr: 'Topa vur.' } }
    ]
  },
  {
    id: 'dark-l-consonant',
    symbol: 'ɫ',
    exampleWord: 'real',
    ipa: '/rɪəɫ/',
    type: 'consonants_voiced',
    descriptionTr: 'Koyu "L" (Dark L) - Damağın arkasında seslendirilen L.',
    descriptionEn: 'Velarized alveolar lateral approximant (Dark L).',
    spellingPatterns: [
      { spelling: 'l', examples: ['milk'] },
      { spelling: 'le', examples: ['table'] },
      { spelling: 'al', examples: ['final'] }
    ],
    words: [
      { id: 'w_real', word: 'real', ipa: '/rɪəɫ/', spellingPattern: 'l', translation: { tr: 'gerçek' }, exampleSentence: 'A real story.', sentenceTranslation: { tr: 'Gerçek bir hikaye.' } },
      { id: 'w_milk', word: 'milk', ipa: '/mɪɫk/', spellingPattern: 'l', translation: { tr: 'süt' }, exampleSentence: 'Drink cold milk.', sentenceTranslation: { tr: 'Soğuk süt iç.' } },
      { id: 'w_table', word: 'table', ipa: '/ˈteɪbɫ/', spellingPattern: 'le', translation: { tr: 'masa' }, exampleSentence: 'On the table.', sentenceTranslation: { tr: 'Masanın üzerinde.' } },
      { id: 'w_final', word: 'final', ipa: '/ˈfaɪnɫ/', spellingPattern: 'al', translation: { tr: 'son / final' }, exampleSentence: 'The final step.', sentenceTranslation: { tr: 'Son adım.' } }
    ]
  },
  {
    id: 'i-happy',
    symbol: 'i',
    exampleWord: 'me',
    ipa: '/mi/',
    type: 'monophthongs',
    descriptionTr: 'Kısa vurgusuz "i" sesi - Kelime sonlarındaki ses.',
    descriptionEn: 'Short unstressed close front vowel sound.',
    spellingPatterns: [
      { spelling: 'y', examples: ['happy'] },
      { spelling: 'ee', examples: ['coffee'] },
      { spelling: 'e', examples: ['receive'] },
      { spelling: 'ie', examples: ['movie'] },
      { spelling: 'i', examples: ['habit'] }
    ],
    words: [
      { id: 'w_me_i', word: 'me', ipa: '/mi/', spellingPattern: 'e', translation: { tr: 'beni / bana' }, exampleSentence: 'Listen to me.', sentenceTranslation: { tr: 'Beni dinle.' } },
      { id: 'w_happy_i', word: 'happy', ipa: '/ˈhæpi/', spellingPattern: 'y', translation: { tr: 'mutlu' }, exampleSentence: 'Stay happy.', sentenceTranslation: { tr: 'Mutlu kal.' } },
      { id: 'w_coffee_i', word: 'coffee', ipa: '/ˈkɒfi/', spellingPattern: 'ee', translation: { tr: 'kahve' }, exampleSentence: 'A cup of coffee.', sentenceTranslation: { tr: 'Bir fincan kahve.' } },
      { id: 'w_movie', word: 'movie', ipa: '/ˈmuːvi/', spellingPattern: 'ie', translation: { tr: 'film' }, exampleSentence: 'Watch a movie.', sentenceTranslation: { tr: 'Bir film izle.' } },
      { id: 'w_habit', word: 'habit', ipa: '/ˈhæbɪt/', spellingPattern: 'i', translation: { tr: 'alışkanlık' }, exampleSentence: 'A good habit.', sentenceTranslation: { tr: 'İyi bir alışkanlık.' } }
    ]
  }
];
