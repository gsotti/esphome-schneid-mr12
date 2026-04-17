# Schneid MR-12 – Modbus RTU Registerübersicht

Dieses Dokument beschreibt die Modbus-RTU- und Modbus-TCP-Schnittstelle des
Schneid MR-12 Wärmeübergabe- und Heizkreisreglers. Es enthält alle schreibbaren
Konfigurationsregister (R/W), die schreibgeschützten Istwertregister (R) sowie
die Parameter für Zeitprogramme, Heizkreise, Boilerkreise und den
M-Bus-Wärmemengenzähler. Registeradressen beginnen bei 40000 (Modbus-Konvention
Holding Registers). Alle Werte sind 16-Bit-Integer, sofern nicht anders angegeben.


## Schnittstellenspezifikation


### Modbus RTU

| Eigenschaft | Wert |
|-------------|------|
| Bus | Modbus RTU |
| Medium | RS-422 / RS-485 / RS-232 |
| Baudrate | 1200–57600 (einstellbar am Regler) |
| Datenbits | 8 |
| Stopbits | 1 |
| Parität | keine |
| Antwort-Delay | 50 ms |
| Betrieb | Regler = Slave, Leit-/Visualisiersystem = Master |
| Slave-Adresse | einstellbar am Regler |
| FC 03 | Read Holding Registers 40001 … 49999 (Integer) |
| FC 06 | Preset Single Register 40001 … 49999 (Integer) |


### Modbus TCP

| Eigenschaft | Wert |
|-------------|------|
| Bus | Modbus TCP |
| Medium | TCP/IP |
| Baudrate | 19200–57600 (einstellbar) |
| Betrieb | Regler = Slave, Leit-/Visualisiersystem = Master |
| Slave-Adresse | einstellbar am Regler |
| FC 03 | Read Holding Registers 40001 … 49999 (Integer) |
| FC 06 | Preset Single Register 40001 … 49999 (Integer) |


## Konfiguration (Nr 1–12)

Konfiguration der Basis-Module und Erweiterungs-Module. Werte legen die Betriebsart des jeweiligen Moduls fest.

| Nr | Bezeichnung | Register | Typ | R/W | Dpkt | Einheit | Wertebereich / Beschreibung |
|----|-------------|----------|-----|-----|------|---------|-----------------------------|
| 1 | Konfiguration Basis C | 40000 | Integer | R/W |  |  | 0=nicht vorhanden · 1=WW-Registerspeicher · 2=Umschaltventil WW · 3=Lademodul mit P1 · 4=WW-Lademodul geregelt · 5=Heizungsspeicher (Puffer) · 6=Differenzregler Solar · 7=Zirkulationspumpe Basis D · 8=ext. WW-Ladung · 9=Sonderprogramm · 10=WW-Lademodul ger.V45 |
| 2 | Konfiguration Basis B | 40001 | Integer | R/W |  |  | 0=nicht vorhanden · 1=Heizkurvenregelung · 2=Raumregelung ohne Optimierung · 3=Raumregelung · 4=Raumthermostat · 5=0-10V Freigabe · 6=Zwischenkreis ohne Pumpe · 7=Zwischenkreis mit Pumpe · 8=RL-Anhebung mit V45 · 9=VL-Regelung mit V45 und T8 |
| 3 | Konfiguration Modul 1 | 40002 | Integer | R/W |  |  | 0=nicht vorhanden · 1=Heizkurvenregelung · 2=Raumregelung ohne Optimierung · 3=Raumregelung · 4=Raumthermostat · 5=0-10V Vorgabe · 6=WW-Lademodul Speicher 1 · 7=WW-Zirkulationspumpe Speicher 1 · 8=Umschaltung zus.Wärmeerzeuger · 9=Freigabe zus.Wärmeerzeuger · 10=Zwischenkreispumpe |
| 4 | Konfiguration Modul 2 | 40003 | Integer | R/W |  |  | wie Modul 1, Speicher 2 statt Speicher 1 |
| 5 | Konfiguration Modul 3 | 40004 | Integer | R/W |  |  | 0=nicht vorhanden · 1=Heizkurvenregelung · 2=Raumregelung ohne Optimierung · 3=Raumregelung · 4=Raumthermostat · 5=0-10V Vorgabe · 6=Steckplatz Drehzahlregelmodul · 7=WW-Zirkulationspumpe Speicher 1 · 8=Umschaltung zus.Wärmeerzeuger · 9=Freigabe zus.Wärmeerzeuger · 10=Zwischenkreispumpe |
| 6 | Konfiguration Modul 4 | 40005 | Integer | R/W |  |  | wie Modul 3 |
| 7 | Konfiguration Modul 5 | 40006 | Integer | R/W |  |  | wie Modul 3 |
| 8 | Konfiguration Modul 6 | 40007 | Integer | R/W |  |  | wie Modul 3 |
| 9 | Konfiguration Modul 7 | 40008 | Integer | R/W |  |  | wie Modul 3 |
| 10 | Konfiguration Basis D | 40009 | Integer | R/W |  |  | 0=nicht vorhanden · 1=Fernwärme · 2=Temp.-Regler BasisB |
| 11 | Konfiguration Basis A | 40010 | Integer | R/W |  |  | (reserviert) |
| 12 | Boiler prim.-seitig | 40011 | Integer | R/W |  |  | 0=Nein · 1=Ja |


## Systemparameter Allgemein (Nr 13–66)

Allgemeine Anlagenparameter: Solar, Puffer, Fernwärme-Übergabestation, Frostschutz, Ausheizprogramm.

| Nr | Bezeichnung | Register | Typ | R/W | Dpkt | Einheit | Wertebereich / Beschreibung |
|----|-------------|----------|-----|-----|------|---------|-----------------------------|
| 13 | Offset Aussentemperatur | 40012 | Integer | R/W | 1 | x,x°C | Korrekturwert Außenfühler |
| 14 | Betriebsart Solaranlage | 40013 | Integer | R/W |  |  |  |
| 15 | Max. Puffertemperatur | 40014 | Integer | R/W |  | °C |  |
| 16 | Max. Kollektortemperatur | 40015 | Integer | R/W |  | °C |  |
| 17 | Einschalthysterese Solar | 40016 | Integer | R/W |  | °C |  |
| 18 | Handbetrieb Solarpumpe | 40017 | Integer | R/W |  |  | 0=AUS · 1=EIN |
| 19 | Min. Drehzahl Solar | 40018 | Integer | R/W |  | % |  |
| 20 | Handbetrieb Aout | 40019 | Integer | R/W |  | % |  |
| 21 | Dauer Partymodus | 40020 | Integer | R/W |  | h |  |
| 22 | Abschaltung Pumpen | 40021 | Integer | R/W |  |  | 0=AUS · 1=alle Heizkreise · 2=HK 0 · 3=HK 1 · 4=HK 2 · 5=HK 3 |
| 23 | Ein/Aus Anhebung | 40022 | Integer | R/W |  | °C |  |
| 24 | Volle Nachtabsenkung | 40023 | Integer | R/W |  |  | 0=Nein · 1=Ja |
| 25 | Keine Nachtabsenkung | 40024 | Integer | R/W |  | x15m |  |
| 26 | Hyst. Thermostatregler | 40025 | Integer | R/W |  | °C |  |
| 27 | Einschalttemp. Zirkulationspumpe | 40026 | Integer | R/W |  | °C |  |
| 28 | AT Mittel Regelung | 40027 | Integer | R/W |  |  | 0=Ventil ZU · 1=Ventil AUF · 2=Ventil STOP · 3=Automatik |
| 29 | Vorlauftemp. bei Frost | 40028 | Integer | R/W |  | °C |  |
| 30 | Frostschutztemp. Aussen | 40029 | Integer | R/W |  | °C |  |
| 31 | Ausheizprogramm Ja/Nein | 40030 | Integer | R/W |  |  | 0=deaktiviert · 1=aktiviert |
| 32 | Start Temp. Ausheizung | 40031 | Integer | R/W |  | °C |  |
| 33 | Stop Temp. Ausheizung | 40032 | Integer | R/W |  | °C |  |
| 34 | AT Mittel Langzeit | 40033 | Integer | R/W |  | h |  |
| 35 | Anstieg Ausheiz. 24h | 40034 | Integer | R/W |  | °C |  |
| 36 | Haltezeit Ausheizung | 40035 | Integer | R/W |  | Tage |  |
| 37 | Hyst. Zuschaltung ext. Kessel | 40036 | Integer | R/W |  | °C |  |
| 38 | Hyst. Wegschaltung ext. Kessel | 40037 | Integer | R/W |  | °C |  |
| 39 | Zuschalt-Timeout Ext. Kessel | 40038 | Integer | R/W |  | m |  |
| 40 | Mindestlaufzeit Ext. Kessel | 40039 | Integer | R/W |  | m |  |
| 41 | Maximalleistung | 40040 | Integer | R/W |  | kW |  |
| 42 | Rücklauftemp. bei -20°C | 40041 | Integer | R/W |  | °C | Fernwärme-Kennlinie |
| 43 | Rücklauftemp. bei +20°C | 40042 | Integer | R/W |  | °C | Fernwärme-Kennlinie |
| 44 | RL Begrenzung Boiler | 40043 | Integer | R/W |  | °C |  |
| 45 | Timer Fernwärmeventil | 40044 | Integer | R/W |  | s |  |
| 46 | Faktor Fernwärmeventil Temperatur | 40045 | Integer | R/W |  |  |  |
| 47 | Faktor Fernwärmeventil Leistung | 40046 | Integer | R/W |  |  |  |
| 48 | Laufzeit Primärventil | 40047 | Integer | R/W |  | s |  |
| 49 | Stationserhöhung | 40048 | Integer | R/W |  | °C |  |
| 50 | Handbetrieb Primärventil | 40049 | Integer | R/W |  |  | 0=Ventil ZU · 1=Ventil AUF · 2=Ventil STOP · 3=Automatik |
| 51 | Pufferbetriebsart | 40050 | Integer | R/W |  |  | 0=Heizungsspeicher · 1=Boiler im Puffer · 2=Boiler und Puffer parallel |
| 52 | Grädigkeit RLB | 40051 | Integer | R/W |  | °C |  |
| 53 | Reduktion Ausheiz. 24h | 40052 | Integer | R/W |  | °C |  |
| 54 | Leistungsbegrenzung Ja/Nein | 40053 | Integer | R/W |  |  | 0=Nein · 1=Ja |
| 55 | P-Band Pufferregler | 40054 | Integer | R/W |  | °C |  |
| 56 | Min. Puffertemp. Oben | 40055 | Integer | R/W |  | °C |  |
| 57 | Min. Drehzahl Ladepumpe | 40056 | Integer | R/W |  | % |  |
| 58 | Handbetriebsdrehzahl | 40057 | Integer | R/W |  | % |  |
| 59 | Pufferbetriebsart (2) | 40058 | Integer | R/W |  |  |  |
| 60 | Hyst. Puffer AUS | 40059 | Integer | R/W |  | °C |  |
| 61 | Parameter MMC lesen | 40060 | Integer | R/W |  |  | 1=Ebene 1 · 2=Ebene 2 · 3=Ebene 3 · 4=Ebene 4 |
| 62 | Startberechtigung | 40061 | Integer | R/W |  |  |  |
| 63 | Endwert bei 0-10V | 40062 | Integer | R/W |  | °C |  |
| 64 | Parameter MMC schreiben | 40063 | Integer | R/W |  |  |  |
| 65 | Relaiscode | 40064 | Integer | R/W |  |  |  |
| 66 | Einstellbare Zeitenräume | 40065 | Integer | R/W |  |  | 0=Heizzeiten · 1=Absenkzeiten · 2=Heiz- und Sperrzeiträume · 3=Absenk- und Sperrzeiträume |


## Anzeige und Kommunikation (Nr 67–80)

| Nr | Bezeichnung | Register | Typ | R/W | Dpkt | Einheit | Wertebereich / Beschreibung |
|----|-------------|----------|-----|-----|------|---------|-----------------------------|
| 67 | Einstellbare Zeitenräume (Display) | 40066 | Integer | R/W |  |  | 0=Heizzeiten · 1=Absenkzeiten · 2=Heiz- und Sperrzeiträume · 3=Absenk- und Sperrzeiträume |
| 68 | Sprache | 40067 | Integer | R/W |  |  | 0=Deutsch · 1=Italienisch · 2=Englisch |
| 69 | Helligkeit Backlight | 40068 | Integer | R/W |  |  |  |
| 70 | Kontrast Display | 40069 | Integer | R/W |  |  |  |
| 71 | Heizkreisbezeichnung Ja/Nein | 40070 | Integer | R/W |  |  | 0=Nein · 1=Ja |
| 72 | Daten in SinVis | 40071 | Integer | R/W |  |  | 0=Nein · 1=Ja |
| 73 | Wärmezählertyp | 40072 | Integer | R/W |  |  | 0=keiner · 1=Standard-MBus · 2=Siemens UH50 · 3=Danfoss Infocal · 4=Aquamento Calec · 5=Sharky Heart Int6 · 6=Sontex Supercal · 7=Siemens clockset · 8=Autotyp 1 · 9=Autotyp 2 · 10=Autotyp 3 · 11=Mbus Testmodus |
| 74 | Anzahl MBus Geräte | 40073 | Integer | R/W |  |  |  |
| 75 | Adresse ComA | 40074 | Integer | R/W |  |  |  |
| 76 | Adresse ComC | 40075 | Integer | R/W |  |  |  |
| 77 | Baudrate ComA | 40076 | Integer | R/W |  |  | 0=300 · 1=600 · 2=1200 · 3=2400 · 4=4800 · 5=9600 · 6=14400 · 7=19200 · 8=28800 · 9=38400 · 10=57600 · 11=115200 |
| 78 | Baudrate ComB | 40077 | Integer | R/W |  |  | 0=300 · 1=600 · 2=1200 · 3=2400 · 4=4800 · 5=9600 · 6=14400 · 7=19200 · 8=28800 · 9=38400 · 10=57600 · 11=115200 |
| 79 | Baudrate ComC | 40078 | Integer | R/W |  |  | 0=300 · 1=600 · 2=1200 · 3=2400 · 4=4800 · 5=9600 · 6=14400 · 7=19200 · 8=28800 · 9=38400 · 10=57600 · 11=115200 |
| 80 | Kaltstart | 40079 | Integer | R/W |  |  | 0=Nein · 1=Ja |


## Boilerkreis 1 (Nr 81–90)

| Nr | Bezeichnung | Register | Typ | R/W | Dpkt | Einheit | Wertebereich / Beschreibung |
|----|-------------|----------|-----|-----|------|---------|-----------------------------|
| 81 | Boilersolltemp. 1 | 40080 | Integer | R/W |  | °C |  |
| 82 | Boilerminimaltemp. 1 | 40081 | Integer | R/W |  | °C |  |
| 83 | Boilerausschalttemp. 1 | 40082 | Integer | R/W |  | °C |  |
| 84 | Boilerladetemp. Soll 1 | 40083 | Integer | R/W |  | °C |  |
| 85 | Boilerladetemp. Min 1 | 40084 | Integer | R/W |  | °C |  |
| 86 | Legionellenladung 1 | 40085 | Integer | R/W |  |  | 0=deaktiviert · 1=Montag … 7=Sonntag |
| 87 | Hyst. Boiler Ladezeit 1 | 40086 | Integer | R/W |  | °C |  |
| 88 | Nachlaufzeit Boilerpumpe 1 | 40087 | Integer | R/W |  | min |  |
| 89 | Boilerladeart 1 | 40088 | Integer | R/W |  |  | 0=bis Solltemp. · 1=Mintemp. Halten · 2=Sperre Ladezeit |
| 90 | Boilersperre 1 | 40089 | Integer | R/W |  |  | 0=deaktiviert · 1=bis Boilertemp. · 2=bis Ladetemp. |


## Boilerkreis 2 (Nr 91–100)

| Nr | Bezeichnung | Register | Typ | R/W | Dpkt | Einheit | Wertebereich / Beschreibung |
|----|-------------|----------|-----|-----|------|---------|-----------------------------|
| 91 | Boilersolltemp. 2 | 40090 | Integer | R/W |  | °C |  |
| 92 | Boilerminimaltemp. 2 | 40091 | Integer | R/W |  | °C |  |
| 93 | Boilerausschalttemp. 2 | 40092 | Integer | R/W |  | °C |  |
| 94 | Boilerladetemp. Soll 2 | 40093 | Integer | R/W |  | °C |  |
| 95 | Boilerladetemp. Min 2 | 40094 | Integer | R/W |  | °C |  |
| 96 | Legionellenladung 2 | 40095 | Integer | R/W |  |  | 0=deaktiviert · 1=Montag … 7=Sonntag |
| 97 | Hyst. Boiler Ladezeit 2 | 40096 | Integer | R/W |  | °C |  |
| 98 | Nachlaufzeit Boilerpumpe 2 | 40097 | Integer | R/W |  | min |  |
| 99 | Boilerladeart 2 | 40098 | Integer | R/W |  |  | 0=bis Solltemp. · 1=Mintemp. Halten · 2=Sperre Ladezeit |
| 100 | Boilersperre 2 | 40099 | Integer | R/W |  |  | 0=deaktiviert · 1=bis Boilertemp. · 2=bis Ladetemp. |


## Heizkreisparameter (Nr 101–216)

Jeder der 8 Heizkreise (0–7) belegt 14 aufeinanderfolgende Register.

**Registerstruktur je Heizkreis** (Offset = 14 × Kreisnummer, Basisregister 40100):

| Nr | Bezeichnung | Register | Typ | R/W | Dpkt | Einheit | Wertebereich / Beschreibung |
|----|-------------|----------|-----|-----|------|---------|-----------------------------|
| N+0 | Abschalttemp. Tagbetrieb | 40100+14·N+0 | Integer | R/W |  | °C |  |
| N+1 | Abschalttemp. Absenkung | 40100+14·N+1 | Integer | R/W |  | °C |  |
| N+2 | Raumsolltemperatur | 40100+14·N+2 | Integer | R/W |  | x,x°C |  |
| N+3 | VL-Soll bei +20°C AT | 40100+14·N+3 | Integer | R/W |  | °C | Vorlaufsoll-Heizkurve bei +20°C Außentemp. |
| N+4 | VL-Soll bei +5°C AT | 40100+14·N+4 | Integer | R/W |  | °C |  |
| N+5 | VL-Soll bei -10°C AT | 40100+14·N+5 | Integer | R/W |  | °C |  |
| N+6 | Max. Vorlauftemperatur | 40100+14·N+6 | Integer | R/W |  | °C |  |
| N+7 | Min. Vorlauftemperatur | 40100+14·N+7 | Integer | R/W |  | °C |  |
| N+8 | Warmwassernachrang | 40100+14·N+8 | Integer | R/W |  |  | 0=Nein · 1=Ja · 2=Restwärmenutzung |
| N+9 | Timer Heizkreis | 40100+14·N+9 | Integer | R/W |  | s |  |
| N+10 | Faktor Heizkreis | 40100+14·N+10 | Integer | R/W |  | % |  |
| N+11 | Raumeinfluss Heizkreis | 40100+14·N+11 | Integer | R/W |  | x,x°C |  |
| N+12 | Faktor Raumregelung Heizkreis | 40100+14·N+12 | Integer | R/W |  | % |  |
| N+13 | Offset Raumtemperatur | 40100+14·N+13 | Integer | R/W |  | x,x°C |  |

**Registeradressen nach Heizkreis:**

| Heizkreis | Nr-Bereich | Register-Bereich |
|-----------|------------|-----------------|
| 0 | 101–114 | 40100–40113 |
| 1 | 115–128 | 40114–40127 |
| 2 | 129–142 | 40128–40141 |
| 3 | 143–156 | 40142–40155 |
| 4 | 157–170 | 40156–40169 |
| 5 | 171–184 | 40170–40183 |
| 6 | 185–198 | 40184–40197 |
| 7 | 199–212 | 40198–40211 |


## Urlaubszeitraum und Ladezeiträume (Nr 217–240)

| Nr | Bezeichnung | Register | Typ | R/W | Dpkt | Einheit | Wertebereich / Beschreibung |
|----|-------------|----------|-----|-----|------|---------|-----------------------------|
| 217 | Urlaubszeitraum VON – Tag | 40216 | Integer | R/W |  |  |  |
| 218 | Urlaubszeitraum VON – Monat | 40217 | Integer | R/W |  |  |  |
| 219 | Urlaubszeitraum VON – Jahr | 40218 | Integer | R/W |  |  |  |
| 220 | Urlaubszeitraum BIS – Tag | 40219 | Integer | R/W |  |  |  |
| 221 | Urlaubszeitraum BIS – Monat | 40220 | Integer | R/W |  |  |  |
| 222 | Urlaubszeitraum BIS – Jahr | 40221 | Integer | R/W |  |  |  |
| 223 | Boilerladezeitraum 1 Boiler 1 Von | 40222 | Integer | R/W |  | hhmm |  |
| 224 | Boilerladezeitraum 1 Boiler 1 Bis | 40223 | Integer | R/W |  | hhmm |  |
| 225 | Boilerladezeitraum 2 Boiler 1 Von | 40224 | Integer | R/W |  | hhmm |  |
| 226 | Boilerladezeitraum 2 Boiler 1 Bis | 40225 | Integer | R/W |  | hhmm |  |
| 227 | Boilerladezeitraum 3 Boiler 1 Von | 40226 | Integer | R/W |  | hhmm |  |
| 228 | Boilerladezeitraum 3 Boiler 1 Bis | 40227 | Integer | R/W |  | hhmm |  |
| 229 | Boilerladezeitraum 1 Boiler 2 Von | 40228 | Integer | R/W |  | hhmm |  |
| 230 | Boilerladezeitraum 1 Boiler 2 Bis | 40229 | Integer | R/W |  | hhmm |  |
| 231 | Boilerladezeitraum 2 Boiler 2 Von | 40230 | Integer | R/W |  | hhmm |  |
| 232 | Boilerladezeitraum 2 Boiler 2 Bis | 40231 | Integer | R/W |  | hhmm |  |
| 233 | Boilerladezeitraum 3 Boiler 2 Von | 40232 | Integer | R/W |  | hhmm |  |
| 234 | Boilerladezeitraum 3 Boiler 2 Bis | 40233 | Integer | R/W |  | hhmm |  |
| 235 | Zirkulationszeitraum 1 Von | 40234 | Integer | R/W |  | hhmm |  |
| 236 | Zirkulationszeitraum 1 Bis | 40235 | Integer | R/W |  | hhmm |  |
| 237 | Zirkulationszeitraum 2 Von | 40236 | Integer | R/W |  | hhmm |  |
| 238 | Zirkulationszeitraum 2 Bis | 40237 | Integer | R/W |  | hhmm |  |
| 239 | Zirkulationszeitraum 3 Von | 40238 | Integer | R/W |  | hhmm |  |
| 240 | Zirkulationszeitraum 3 Bis | 40239 | Integer | R/W |  | hhmm |  |


## Betriebsmodus und Sonderkreis (Nr 241–264)

| Nr | Bezeichnung | Register | Typ | R/W | Dpkt | Einheit | Wertebereich / Beschreibung |
|----|-------------|----------|-----|-----|------|---------|-----------------------------|
| 241 | Betriebsmodus Kreis 0 | 40240 | Integer | R/W |  |  | 0=AUS/Frostschutz · 1=nur Absenkbetrieb · 2=nur Heizbetrieb · 3=Automatik/Zeitprogramm · 4=nur Boilerbetrieb · 5=Partymodus · 6=Wartung (Aus, kein Frostschutz!) |
| 242 | Betriebsmodus Kreis 1 | 40241 | Integer | R/W |  |  | 0=AUS/Frostschutz · 1=nur Absenkbetrieb · 2=nur Heizbetrieb · 3=Automatik/Zeitprogramm · 4=nur Boilerbetrieb · 5=Partymodus · 6=Wartung (Aus, kein Frostschutz!) |
| 243 | Betriebsmodus Kreis 2 | 40242 | Integer | R/W |  |  | 0=AUS/Frostschutz · 1=nur Absenkbetrieb · 2=nur Heizbetrieb · 3=Automatik/Zeitprogramm · 4=nur Boilerbetrieb · 5=Partymodus · 6=Wartung (Aus, kein Frostschutz!) |
| 244 | Betriebsmodus Kreis 3 | 40243 | Integer | R/W |  |  | 0=AUS/Frostschutz · 1=nur Absenkbetrieb · 2=nur Heizbetrieb · 3=Automatik/Zeitprogramm · 4=nur Boilerbetrieb · 5=Partymodus · 6=Wartung (Aus, kein Frostschutz!) |
| 245 | Betriebsmodus Kreis 4 | 40244 | Integer | R/W |  |  | 0=AUS/Frostschutz · 1=nur Absenkbetrieb · 2=nur Heizbetrieb · 3=Automatik/Zeitprogramm · 4=nur Boilerbetrieb · 5=Partymodus · 6=Wartung (Aus, kein Frostschutz!) |
| 246 | Betriebsmodus Kreis 5 | 40245 | Integer | R/W |  |  | 0=AUS/Frostschutz · 1=nur Absenkbetrieb · 2=nur Heizbetrieb · 3=Automatik/Zeitprogramm · 4=nur Boilerbetrieb · 5=Partymodus · 6=Wartung (Aus, kein Frostschutz!) |
| 247 | Betriebsmodus Kreis 6 | 40246 | Integer | R/W |  |  | 0=AUS/Frostschutz · 1=nur Absenkbetrieb · 2=nur Heizbetrieb · 3=Automatik/Zeitprogramm · 4=nur Boilerbetrieb · 5=Partymodus · 6=Wartung (Aus, kein Frostschutz!) |
| 248 | Betriebsmodus Kreis 7 | 40247 | Integer | R/W |  |  | 0=AUS/Frostschutz · 1=nur Absenkbetrieb · 2=nur Heizbetrieb · 3=Automatik/Zeitprogramm · 4=nur Boilerbetrieb · 5=Partymodus · 6=Wartung (Aus, kein Frostschutz!) |
| 249 | Sonderkreis Kreis 0 | 40248 | Integer | R/W |  |  | 0=Nein · 1=Ja |
| 250 | Sonderkreis Kreis 1 | 40249 | Integer | R/W |  |  | 0=Nein · 1=Ja |
| 251 | Sonderkreis Kreis 2 | 40250 | Integer | R/W |  |  | 0=Nein · 1=Ja |
| 252 | Sonderkreis Kreis 3 | 40251 | Integer | R/W |  |  | 0=Nein · 1=Ja |
| 253 | Sonderkreis Kreis 4 | 40252 | Integer | R/W |  |  | 0=Nein · 1=Ja |
| 254 | Sonderkreis Kreis 5 | 40253 | Integer | R/W |  |  | 0=Nein · 1=Ja |
| 255 | Sonderkreis Kreis 6 | 40254 | Integer | R/W |  |  | 0=Nein · 1=Ja |
| 256 | Sonderkreis Kreis 7 | 40255 | Integer | R/W |  |  | 0=Nein · 1=Ja |
| 257 | Absenkkorrektur Kreis 0 | 40256 | Integer | R/W | 1 | x,x°C |  |
| 258 | Absenkkorrektur Kreis 1 | 40257 | Integer | R/W | 1 | x,x°C |  |
| 259 | Absenkkorrektur Kreis 2 | 40258 | Integer | R/W | 1 | x,x°C |  |
| 260 | Absenkkorrektur Kreis 3 | 40259 | Integer | R/W | 1 | x,x°C |  |
| 261 | Absenkkorrektur Kreis 4 | 40260 | Integer | R/W | 1 | x,x°C |  |
| 262 | Absenkkorrektur Kreis 5 | 40261 | Integer | R/W | 1 | x,x°C |  |
| 263 | Absenkkorrektur Kreis 6 | 40262 | Integer | R/W | 1 | x,x°C |  |
| 264 | Absenkkorrektur Kreis 7 | 40263 | Integer | R/W | 1 | x,x°C |  |


## Heiz-Absenkzeiten (Nr 265–586)

Jedes Modul (Basis B, Modul 1, Modul 2) enthält Heizzeiten-/Absenkzeiten-Wochenprogramme.
Pro Modul stehen 3 Schaltzeiträume (Slot 1–3) pro Wochentag (Mo–So) zur Verfügung,
jeweils als Von-/Bis-Paar im Format **hhmm** (z. B. 0600 = 06:00 Uhr).

**Struktur pro Modul:** 7 Tage × 3 Slots × 2 (Von/Bis) = **42 Register**

| Modul | Nr-Bereich | Register-Bereich | Bemerkung |
|-------|------------|-----------------|-----------|
| Basis B | 265–306 | 40264–40305 | Heizkreis Basis B |
| Basis B (2) | 307–348 | 40306–40347 | zweite Programmtabelle |
| Basis B (3) | 349–382 | 40348–40381 | weitere Zeitwerte / WÜST |
| Modul 1 | 383–424 | 40382–40423 | Heizkreis Modul 1 |
| Modul 1 (2) | 425–466 | 40424–40465 | zweite Programmtabelle |
| Modul 1 (3) | 467–484 | 40466–40483 | weitere Zeitwerte |
| Modul 2 | 485–526 | 40484–40525 | Heizkreis Modul 2 |
| Modul 2 (2) | 527–568 | 40526–40567 | zweite Programmtabelle |
| Modul 2 (3) | 569–586 | 40568–40585 | weitere Zeitwerte |

**Registerstruktur einer 42-Register-Wochenzeittabelle** (Beispiel ab Register R₀):

| Nr | Bezeichnung | Register | Typ | R/W | Dpkt | Einheit | Wertebereich / Beschreibung |
|----|-------------|----------|-----|-----|------|---------|-----------------------------|
| R₀+0 | Slot 1 Montag – Von | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+1 | Slot 1 Montag – Bis | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+2 | Slot 2 Montag – Von | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+3 | Slot 2 Montag – Bis | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+4 | Slot 3 Montag – Von | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+5 | Slot 3 Montag – Bis | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+6 | Slot 1 Dienstag – Von | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+7 | Slot 1 Dienstag – Bis | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+8 | Slot 2 Dienstag – Von | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+9 | Slot 2 Dienstag – Bis | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+10 | Slot 3 Dienstag – Von | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+11 | Slot 3 Dienstag – Bis | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+12 | Slot 1 Mittwoch – Von | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+13 | Slot 1 Mittwoch – Bis | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+14 | Slot 2 Mittwoch – Von | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+15 | Slot 2 Mittwoch – Bis | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+16 | Slot 3 Mittwoch – Von | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+17 | Slot 3 Mittwoch – Bis | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+18 | Slot 1 Donnerstag – Von | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+19 | Slot 1 Donnerstag – Bis | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+20 | Slot 2 Donnerstag – Von | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+21 | Slot 2 Donnerstag – Bis | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+22 | Slot 3 Donnerstag – Von | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+23 | Slot 3 Donnerstag – Bis | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+24 | Slot 1 Freitag – Von | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+25 | Slot 1 Freitag – Bis | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+26 | Slot 2 Freitag – Von | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+27 | Slot 2 Freitag – Bis | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+28 | Slot 3 Freitag – Von | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+29 | Slot 3 Freitag – Bis | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+30 | Slot 1 Samstag – Von | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+31 | Slot 1 Samstag – Bis | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+32 | Slot 2 Samstag – Von | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+33 | Slot 2 Samstag – Bis | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+34 | Slot 3 Samstag – Von | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+35 | Slot 3 Samstag – Bis | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+36 | Slot 1 Sonntag – Von | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+37 | Slot 1 Sonntag – Bis | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+38 | Slot 2 Sonntag – Von | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+39 | Slot 2 Sonntag – Bis | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+40 | Slot 3 Sonntag – Von | R₀+Offset | Integer | R/W |  | hhmm |  |
| R₀+41 | Slot 3 Sonntag – Bis | R₀+Offset | Integer | R/W |  | hhmm |  |


## Istwerte Übergabestation (Nr 587–606)

| Nr | Bezeichnung | Register | Typ | R/W | Dpkt | Einheit | Wertebereich / Beschreibung |
|----|-------------|----------|-----|-----|------|---------|-----------------------------|
| 587 | T6 Aussentemperatur | 40586 | Integer | R | 1 | x,x°C |  |
| 588 | T7 RL Primär | 40587 | Integer | R | 1 | x,x°C |  |
| 589 | T8 VL Sekundär | 40588 | Integer | R | 1 | x,x°C |  |
| 590 | T11 RL Sekundär | 40589 | Integer | R | 1 | x,x°C |  |
| 591 | Solltemperatur VL Sekundär | 40590 | Integer | R/W | 1 | x,x°C |  |
| 592 | Max. Rücklauftemp. primär | 40591 | Integer | R/W | 1 | x,x°C |  |
| 593 | Status Übergabestation | 40592 | Integer | R |  |  | 0=AUS · 1=EIN · 2=RL-Begrenzung · 3=Leist.-Begrenzung · 4=Handbetrieb |
| 594 | Tagpoti WÜST | 40593 | Integer | R/W | 1 | x,x°C | Fernbedienung Tagkorrektur |
| 595 | Nachtpoti WÜST | 40594 | Integer | R/W | 1 | x,x°C | Fernbedienung Nachtkorrektur |
| 596 | Funktion WÜST | 40595 | Integer | R/W |  |  | Wahlschalter-Funktion Fernbedienung |
| 597 | Abschalttemp. Tagbetrieb 0 (Status) | 40596 | Integer | R | 1 | x,x°C |  |
| 598 | Abschalttemp. Absenkung 0 (Status) | 40597 | Integer | R | 1 | x,x°C |  |
| 599 | Raumsolltemperatur 0 (Status) | 40598 | Integer | R | 1 | x,x°C |  |
| 600 | Abschalttemp. Tagbetrieb 1 (Status) | 40599 | Integer | R | 1 | x,x°C |  |
| 601 | Abschalttemp. Absenkung 1 (Status) | 40600 | Integer | R | 1 | x,x°C |  |
| 602 | Raumsolltemperatur 1 (Status) | 40601 | Integer | R | 1 | x,x°C |  |
| 603 | Abschalttemp. Tagbetrieb 2 (Status) | 40602 | Integer | R | 1 | x,x°C |  |
| 604 | Abschalttemp. Absenkung 2 (Status) | 40603 | Integer | R | 1 | x,x°C |  |
| 605 | Raumsolltemperatur 2 (Status) | 40604 | Integer | R | 1 | x,x°C |  |
| 606 | Abschalttemp. Tagbetrieb 3 (Status) | 40605 | Integer | R | 1 | x,x°C |  |


## Istwerte Heizkreise (Nr 607–694)

Pro Heizkreis (0–7) stehen 11 Istwert-Register bereit.

| Nr | Bezeichnung | Register | Typ | R/W | Dpkt | Einheit | Wertebereich / Beschreibung |
|----|-------------|----------|-----|-----|------|---------|-----------------------------|
| 607 | VL Heizkreis 0 | 40606 | Integer | R/W | 1 | x,x°C |  |
| 608 | Solltemperatur Heizkreis 0 | 40607 | Integer | R/W | 1 | x,x°C |  |
| 609 | Raumsolltemperatur Heizkreis 0 | 40608 | Integer | R/W | 1 | x,x°C |  |
| 610 | Raumtemperatur Heizkreis 0 | 40609 | Integer | R | 1 | x,x°C |  |
| 611 | Potentiometer Fernbed. 0 | 40610 | Integer | R | 1 | x,x |  |
| 612 | Fernbedienung 0 | 40611 | Integer | R |  |  |  |
| 613 | Pumpe Heizkreis 0 | 40612 | Integer | R |  |  |  |
| 614 | Status Heizkreis 0 | 40613 | Integer | R |  |  | 9=Automatik · 0=Pumpe AUS-Mischer Steht · 1=Pumpe EIN-Mischer Steht · 2=Pumpe EIN-Mischer AUF · 3=Pumpe EIN-Mischer ZU · 4=Pumpe AUS-Mischer AUF · 5=Pumpe AUS-Mischer ZU · 6=Fernbed. Hand:AUTO · 7=Fernbed. Hand:TAG · 8=Fernbed. Hand:NACHT · 10=Fernbed. Hand:AUS/FS |
| 615 | Status Mischer Heizkreis 0 | 40614 | Integer | R |  |  | 0=Steht · 1=Auf · 2=Zu |
| 616 | VL Heizkreis 1 | 40615 | Integer | R/W | 1 | x,x°C |  |
| 617 | Solltemperatur Heizkreis 1 | 40616 | Integer | R/W | 1 | x,x°C |  |
| 618 | Raumsolltemperatur Heizkreis 1 | 40617 | Integer | R/W | 1 | x,x°C |  |
| 619 | Raumtemperatur Heizkreis 1 | 40618 | Integer | R | 1 | x,x°C |  |
| 620 | Potentiometer Fernbed. 1 | 40619 | Integer | R | 1 | x,x |  |
| 621 | Fernbedienung 1 | 40620 | Integer | R |  |  |  |
| 622 | Pumpe Heizkreis 1 | 40621 | Integer | R |  |  |  |
| 623 | Status Heizkreis 1 | 40622 | Integer | R |  |  | 9=Automatik · 0=Pumpe AUS-Mischer Steht · 1=Pumpe EIN-Mischer Steht · 2=Pumpe EIN-Mischer AUF · 3=Pumpe EIN-Mischer ZU · 4=Pumpe AUS-Mischer AUF · 5=Pumpe AUS-Mischer ZU · 6=Fernbed. Hand:AUTO · 7=Fernbed. Hand:TAG · 8=Fernbed. Hand:NACHT · 10=Fernbed. Hand:AUS/FS |
| 624 | Status Mischer Heizkreis 1 | 40623 | Integer | R |  |  | 0=Steht · 1=Auf · 2=Zu |
| 625 | VL Heizkreis 2 | 40624 | Integer | R/W | 1 | x,x°C |  |
| 626 | Solltemperatur Heizkreis 2 | 40625 | Integer | R/W | 1 | x,x°C |  |
| 627 | Raumsolltemperatur Heizkreis 2 | 40626 | Integer | R/W | 1 | x,x°C |  |
| 628 | Raumtemperatur Heizkreis 2 | 40627 | Integer | R | 1 | x,x°C |  |
| 629 | Potentiometer Fernbed. 2 | 40628 | Integer | R | 1 | x,x |  |
| 630 | Fernbedienung 2 | 40629 | Integer | R |  |  |  |
| 631 | Pumpe Heizkreis 2 | 40630 | Integer | R |  |  |  |
| 632 | Status Heizkreis 2 | 40631 | Integer | R |  |  | 9=Automatik · 0=Pumpe AUS-Mischer Steht · 1=Pumpe EIN-Mischer Steht · 2=Pumpe EIN-Mischer AUF · 3=Pumpe EIN-Mischer ZU · 4=Pumpe AUS-Mischer AUF · 5=Pumpe AUS-Mischer ZU · 6=Fernbed. Hand:AUTO · 7=Fernbed. Hand:TAG · 8=Fernbed. Hand:NACHT · 10=Fernbed. Hand:AUS/FS |
| 633 | Status Mischer Heizkreis 2 | 40632 | Integer | R |  |  | 0=Steht · 1=Auf · 2=Zu |
| 634 | VL Heizkreis 3 | 40633 | Integer | R/W | 1 | x,x°C |  |
| 635 | Solltemperatur Heizkreis 3 | 40634 | Integer | R/W | 1 | x,x°C |  |
| 636 | Raumsolltemperatur Heizkreis 3 | 40635 | Integer | R/W | 1 | x,x°C |  |
| 637 | Raumtemperatur Heizkreis 3 | 40636 | Integer | R | 1 | x,x°C |  |
| 638 | Potentiometer Fernbed. 3 | 40637 | Integer | R | 1 | x,x |  |
| 639 | Fernbedienung 3 | 40638 | Integer | R |  |  |  |
| 640 | Pumpe Heizkreis 3 | 40639 | Integer | R |  |  |  |
| 641 | Status Heizkreis 3 | 40640 | Integer | R |  |  | 9=Automatik · 0=Pumpe AUS-Mischer Steht · 1=Pumpe EIN-Mischer Steht · 2=Pumpe EIN-Mischer AUF · 3=Pumpe EIN-Mischer ZU · 4=Pumpe AUS-Mischer AUF · 5=Pumpe AUS-Mischer ZU · 6=Fernbed. Hand:AUTO · 7=Fernbed. Hand:TAG · 8=Fernbed. Hand:NACHT · 10=Fernbed. Hand:AUS/FS |
| 642 | Status Mischer Heizkreis 3 | 40641 | Integer | R |  |  | 0=Steht · 1=Auf · 2=Zu |
| 643 | VL Heizkreis 4 | 40642 | Integer | R/W | 1 | x,x°C |  |
| 644 | Solltemperatur Heizkreis 4 | 40643 | Integer | R/W | 1 | x,x°C |  |
| 645 | Raumsolltemperatur Heizkreis 4 | 40644 | Integer | R/W | 1 | x,x°C |  |
| 646 | Raumtemperatur Heizkreis 4 | 40645 | Integer | R | 1 | x,x°C |  |
| 647 | Potentiometer Fernbed. 4 | 40646 | Integer | R | 1 | x,x |  |
| 648 | Fernbedienung 4 | 40647 | Integer | R |  |  |  |
| 649 | Pumpe Heizkreis 4 | 40648 | Integer | R |  |  |  |
| 650 | Status Heizkreis 4 | 40649 | Integer | R |  |  | 9=Automatik · 0=Pumpe AUS-Mischer Steht · 1=Pumpe EIN-Mischer Steht · 2=Pumpe EIN-Mischer AUF · 3=Pumpe EIN-Mischer ZU · 4=Pumpe AUS-Mischer AUF · 5=Pumpe AUS-Mischer ZU · 6=Fernbed. Hand:AUTO · 7=Fernbed. Hand:TAG · 8=Fernbed. Hand:NACHT · 10=Fernbed. Hand:AUS/FS |
| 651 | Status Mischer Heizkreis 4 | 40650 | Integer | R |  |  | 0=Steht · 1=Auf · 2=Zu |
| 652 | VL Heizkreis 5 | 40651 | Integer | R/W | 1 | x,x°C |  |
| 653 | Solltemperatur Heizkreis 5 | 40652 | Integer | R/W | 1 | x,x°C |  |
| 654 | Raumsolltemperatur Heizkreis 5 | 40653 | Integer | R/W | 1 | x,x°C |  |
| 655 | Raumtemperatur Heizkreis 5 | 40654 | Integer | R | 1 | x,x°C |  |
| 656 | Potentiometer Fernbed. 5 | 40655 | Integer | R | 1 | x,x |  |
| 657 | Fernbedienung 5 | 40656 | Integer | R |  |  |  |
| 658 | Pumpe Heizkreis 5 | 40657 | Integer | R |  |  |  |
| 659 | Status Heizkreis 5 | 40658 | Integer | R |  |  | 9=Automatik · 0=Pumpe AUS-Mischer Steht · 1=Pumpe EIN-Mischer Steht · 2=Pumpe EIN-Mischer AUF · 3=Pumpe EIN-Mischer ZU · 4=Pumpe AUS-Mischer AUF · 5=Pumpe AUS-Mischer ZU · 6=Fernbed. Hand:AUTO · 7=Fernbed. Hand:TAG · 8=Fernbed. Hand:NACHT · 10=Fernbed. Hand:AUS/FS |
| 660 | Status Mischer Heizkreis 5 | 40659 | Integer | R |  |  | 0=Steht · 1=Auf · 2=Zu |
| 661 | VL Heizkreis 6 | 40660 | Integer | R/W | 1 | x,x°C |  |
| 662 | Solltemperatur Heizkreis 6 | 40661 | Integer | R/W | 1 | x,x°C |  |
| 663 | Raumsolltemperatur Heizkreis 6 | 40662 | Integer | R/W | 1 | x,x°C |  |
| 664 | Raumtemperatur Heizkreis 6 | 40663 | Integer | R | 1 | x,x°C |  |
| 665 | Potentiometer Fernbed. 6 | 40664 | Integer | R | 1 | x,x |  |
| 666 | Fernbedienung 6 | 40665 | Integer | R |  |  |  |
| 667 | Pumpe Heizkreis 6 | 40666 | Integer | R |  |  |  |
| 668 | Status Heizkreis 6 | 40667 | Integer | R |  |  | 9=Automatik · 0=Pumpe AUS-Mischer Steht · 1=Pumpe EIN-Mischer Steht · 2=Pumpe EIN-Mischer AUF · 3=Pumpe EIN-Mischer ZU · 4=Pumpe AUS-Mischer AUF · 5=Pumpe AUS-Mischer ZU · 6=Fernbed. Hand:AUTO · 7=Fernbed. Hand:TAG · 8=Fernbed. Hand:NACHT · 10=Fernbed. Hand:AUS/FS |
| 669 | Status Mischer Heizkreis 6 | 40668 | Integer | R |  |  | 0=Steht · 1=Auf · 2=Zu |
| 670 | VL Heizkreis 7 | 40669 | Integer | R/W | 1 | x,x°C |  |
| 671 | Solltemperatur Heizkreis 7 | 40670 | Integer | R/W | 1 | x,x°C |  |
| 672 | Raumsolltemperatur Heizkreis 7 | 40671 | Integer | R/W | 1 | x,x°C |  |
| 673 | Raumtemperatur Heizkreis 7 | 40672 | Integer | R | 1 | x,x°C |  |
| 674 | Potentiometer Fernbed. 7 | 40673 | Integer | R | 1 | x,x |  |
| 675 | Fernbedienung 7 | 40674 | Integer | R |  |  |  |
| 676 | Pumpe Heizkreis 7 | 40675 | Integer | R |  |  |  |
| 677 | Status Heizkreis 7 | 40676 | Integer | R |  |  | 9=Automatik · 0=Pumpe AUS-Mischer Steht · 1=Pumpe EIN-Mischer Steht · 2=Pumpe EIN-Mischer AUF · 3=Pumpe EIN-Mischer ZU · 4=Pumpe AUS-Mischer AUF · 5=Pumpe AUS-Mischer ZU · 6=Fernbed. Hand:AUTO · 7=Fernbed. Hand:TAG · 8=Fernbed. Hand:NACHT · 10=Fernbed. Hand:AUS/FS |
| 678 | Status Mischer Heizkreis 7 | 40677 | Integer | R |  |  | 0=Steht · 1=Auf · 2=Zu |


## Istwerte Boiler und Lademodul (Nr 679–731)

| Nr | Bezeichnung | Register | Typ | R/W | Dpkt | Einheit | Wertebereich / Beschreibung |
|----|-------------|----------|-----|-----|------|---------|-----------------------------|
| 679 | T9 Speicher 1 oben | 40678 | Integer | R | 1 | x,x°C |  |
| 680 | T10 Speicher 1 unten | 40679 | Integer | R | 1 | x,x°C |  |
| 681 | Solltemperatur VL Boiler 1 | 40680 | Integer | R/W | 1 | x,x°C |  |
| 682 | Status Boilerkreis 1 | 40681 | Integer | R |  |  | 9=Automatik · 0=Hand: Boilerpumpe AUS · 1=Hand: Boilerpumpe EIN |
| 683 | Pumpe Boiler 1 | 40682 | Integer | R |  |  |  |
| 684 | T12 Speicher 2 oben | 40683 | Integer | R | 1 | x,x°C |  |
| 685 | T13 Speicher 2 unten | 40684 | Integer | R | 1 | x,x°C |  |
| 686 | Solltemperatur VL Boiler 2 | 40685 | Integer | R/W | 1 | x,x°C |  |
| 687 | Status Boilerkreis 2 | 40686 | Integer | R |  |  | 9=Automatik · 0=Hand: Boilerpumpe AUS · 1=Hand: Boilerpumpe EIN |
| 688 | Pumpe Boiler 2 | 40687 | Integer | R |  |  |  |
| 689 | Temp. VL Lademodul 1 | 40688 | Integer | R | 1 | x,x°C |  |
| 690 | Temp. VL Lademodul 2 | 40689 | Integer | R | 1 | x,x°C |  |
| 691 | Temp. Zirkulation 1 | 40690 | Integer | R | 1 | x,x°C |  |
| 692 | Temp. Zirkulation 2 | 40691 | Integer | R | 1 | x,x°C |  |
| 693 | Einschalttemperatur Puffer | 40692 | Integer | R | 1 | x,x°C |  |
| 694 | Ausschalttemperatur Puffer | 40693 | Integer | R | 1 | x,x°C |  |


## System-Istwerte (Nr 700–731)

| Nr | Bezeichnung | Register | Typ | R/W | Dpkt | Einheit | Wertebereich / Beschreibung |
|----|-------------|----------|-----|-----|------|---------|-----------------------------|
| 700 | Drehzahl Puffer | 40699 | Integer | R |  | % |  |
| 701 | Drehzahl Solar | 40700 | Integer | R |  | % |  |
| 702 | Zubringpumpe | 40701 | Integer | R |  |  |  |
| 703 | Ventilstellung | 40702 | Integer | R |  | % |  |
| 704 | Status SDCard in Slot | 40703 | Integer | R |  |  |  |
| 705 | Version Software | 40704 | Integer | R |  |  |  |
| 706 | Hydraulikvariante | 40705 | Integer | R |  |  |  |
| 707 | Technikebene Menü | 40706 | Integer | R |  |  |  |
| 708 | Zirkulationspumpe 1 | 40707 | Integer | R |  |  |  |
| 709 | Zirkulationspumpe 2 | 40708 | Integer | R |  |  |  |
| 710 | Uhrzeit Regler | 40709 | Integer | R |  | hhmm |  |
| 711 | Tag Regler | 40710 | Integer | R |  |  |  |
| 712 | Monat Regler | 40711 | Integer | R |  |  |  |
| 713 | Wochentag Regler | 40712 | Integer | R |  |  | 1=Mo … 7=So |
| 714 | Jahr Regler | 40713 | Integer | R |  |  |  |
| 715 | Status Pumpe Lademodul 1 | 40714 | Integer | R |  |  |  |
| 716 | Status Mischer Lademodul 1 | 40715 | Integer | R |  |  |  |
| 717 | Status Pumpe Lademodul 2 | 40716 | Integer | R |  |  |  |
| 718 | Status Mischer Lademodul 2 | 40717 | Integer | R |  |  |  |
| 719 | HK-Module (Anzahl) | 40718 | Integer | R |  |  |  |
| 720 | Reset Counter | 40719 | Integer | R |  |  |  |
| 721 | Außentemp. Mittel | 40720 | Integer | R | 1 | x,x°C |  |
| 722 | Außentemp. Mittel Langzeit | 40721 | Integer | R | 1 | x,x°C |  |
| 723 | Wärmemenge WMZ int. | 40722 | Integer | R |  |  | 0,1 kWh; Higher 16Bit (16..31) |
| 724 | Wärmemenge WMZ int. (low) | 40723 | Integer | R |  |  | Lower 16Bit (0..15) |


## M-Bus Wärmemengenzähler / WMZ (Nr 732–753)

Folgende Register lesen die Werte des angeschlossenen M-Bus-Wärmemengenzählers. 32-Bit-Werte (unsigned long) belegen jeweils zwei 16-Bit-Register: erstes Register = Higher Word (Bits 16..31), zweites = Lower Word (Bits 0..15).

| Nr | Bezeichnung | Register | Typ | R/W | Dpkt | Einheit | Wertebereich / Beschreibung |
|----|-------------|----------|-----|-----|------|---------|-----------------------------|
| 732 | Wärmemenge WMZ ext. | 40731 | unsigned long | R |  | kWh | Higher 16Bit (Bits 16..31) → Register 40731/40732 |
| 733 | Volumen WMZ ext. | 40733 | unsigned long | R |  | l | Higher 16Bit → Register 40733/40734 |
| 734 | Leistung WMZ ext. | 40735 | unsigned long | R |  | W | Higher 16Bit → Register 40735/40736 |
| 735 | Stichtagszählerstand | 40737 | unsigned long | R |  |  | Register 40737/40738 |
| 736 | Seriennummer WMZ | 40739 | unsigned long | R |  |  | Register 40739/40740 |
| 737 | Durchfluss long | 40741 | unsigned long | R |  |  | Register 40741/40742 |
| 738 | Impulseingang A | 40743 | unsigned long | R |  |  | Register 40743/40744 |
| 739 | Fehleranzeige | 40745 | Integer | R |  |  |  |
| 740 | Durchfluss int. | 40746 | Integer | R |  | l/h |  |
| 741 | Rücklauftemp. WMZ | 40747 | Integer | R |  | x.xx°C |  |
| 742 | Vorlauftemp. WMZ | 40748 | Integer | R |  | x.xx°C |  |
| 743 | Spreizung WMZ | 40749 | Integer | R |  | x.xx°C |  |
| 744 | Betriebstage WMZ | 40750 | Integer | R |  |  |  |
| 745 | Fehltage WMZ | 40751 | Integer | R |  |  |  |
| 746 | Impulseingang B | 40752 | unsigned long | R |  |  | Register 40752/40753 |
| 747 | Tarif 1 | 40755 | unsigned long | R |  | kWh | Register 40755/40756 |
| 748 | Tariflimit 1 | 40757 | unsigned long | R |  | °C | Register 40757/40758 |
| 749 | Tarif 2 | 40759 | unsigned long | R |  | kWh | Register 40759/40760 |
| 750 | Tariflimit 2 | 40761 | unsigned long | R |  | °C | Register 40761/40762 |
| 751 | Tarif 3 | 40763 | unsigned long | R |  | kWh | Register 40763/40764 |
| 752 | HerstellerID WMZ | 40765 | Integer | R |  |  |  |
| 753 | StatusByte WMZ | 40766 | Integer | R |  |  |  |


## Systemparameter erweitert (Nr 754–830)

| Nr | Bezeichnung | Register | Typ | R/W | Dpkt | Einheit | Wertebereich / Beschreibung |
|----|-------------|----------|-----|-----|------|---------|-----------------------------|
| 754 | Version | 40767 | Integer | R |  |  | Softwareversion MBus-Modul |
| 755 | AHZWertVon | 40768 | Integer | R |  |  | Ausheizwert Von |
| 756 | AHZWertBis | 40769 | Integer | R |  |  | Ausheizwert Bis |
| 757 | AHZWertAkt | 40770 | Integer | R |  |  | Ausheizwert Aktuell |
| 758 | AHZWertSumme | 40771 | Integer | R |  |  | Ausheizwert Summe |
| 759 | Relais 1–8 | 40772 | Integer | R |  |  | Bitcodiert: Bit0=Relais1 … Bit7=Relais8 |
| 760 | Relais 9–16 | 40773 | Integer | R |  |  | Bitcodiert |
| 761 | Relais 17–24 | 40774 | Integer | R |  |  | Bitcodiert |
| 762 | Relais 25–32 | 40775 | Integer | R |  |  | Bitcodiert |
| 763 | ZDin bitcodiert | 40776 | Integer | R |  |  | Digitaleingänge |
| 764 | ZDin_inv bitcodiert | 40777 | Integer | R |  |  | Digitaleingänge invertiert |
| 765 | Digitaleingang 1 | 40778 | Integer | R |  |  |  |
| 766 | Digitaleingang 2 | 40779 | Integer | R |  |  |  |
| 767 | Digitaleingang 3 | 40780 | Integer | R |  |  |  |
| 768 | Digitaleingang 4 | 40781 | Integer | R |  |  |  |
| 769 | Digitaleingang 5 | 40782 | Integer | R |  |  |  |
| 770 | Digitaleingang 6 | 40783 | Integer | R |  |  |  |
| 771 | Digitaleingang 7 | 40784 | Integer | R |  |  |  |
| 772 | Aout 1 | 40785 | Integer | R |  | % | Analogausgang 1 |
| 773 | Aout 2 | 40786 | Integer | R |  | % | Analogausgang 2 |
| 774 | Aout 3 | 40787 | Integer | R |  | % | Analogausgang 3 |
| 775 | Aout 4 | 40788 | Integer | R |  | % | Analogausgang 4 |
| 776 | ZAin 1 | 40789 | Integer | R | 1 | x,x% | Analogeingang 1 |
| 777 | ZAin 2 | 40790 | Integer | R | 1 | x,x% | Analogeingang 2 |
| 778 | ZAin 3 | 40791 | Integer | R | 1 | x,x% | Analogeingang 3 |
| 779 | ZAin 4 | 40792 | Integer | R | 1 | x,x% | Analogeingang 4 |
| 780 | ZAin 5 | 40793 | Integer | R | 1 | x,x% | Analogeingang 5 |
| 781 | ZAin 6 | 40794 | Integer | R | 1 | x,x% | Analogeingang 6 |
| 782 | ZAin 7 | 40795 | Integer | R | 1 | x,x% | Analogeingang 7 |
| 783 | ZAin 8 | 40796 | Integer | R | 1 | x,x% | Analogeingang 8 |
| 784 | Firmware Build Number | 40797 | Integer | R |  |  |  |
| 785 | SPS-Version Nein/Ja | 40798 | Integer | R |  |  | 0=Nein · 1=Ja |
| 795 | Zwangsladung Speicher | 40794 | Integer | R/W |  |  | 74=Starten · andere Werte=Auto |
| 800 | (Reserviert 786–800) | 40799 | Integer | R |  |  | Interne Systemregister 40799–40812 |


## Sensor-Offsets und Sonderparameter (Nr 801–827)

| Nr | Bezeichnung | Register | Typ | R/W | Dpkt | Einheit | Wertebereich / Beschreibung |
|----|-------------|----------|-----|-----|------|---------|-----------------------------|
| 801 | Offset T7 | 40814 | Integer | R/W | 1 | x,x°C |  |
| 802 | Offset T8 | 40815 | Integer | R/W | 1 | x,x°C |  |
| 803 | Offset T9 | 40816 | Integer | R/W | 1 | x,x°C |  |
| 804 | Offset T10 | 40817 | Integer | R/W | 1 | x,x°C |  |
| 805 | Offset T11 | 40818 | Integer | R/W | 1 | x,x°C |  |
| 806 | Offset 1T1 | 40819 | Integer | R/W | 1 | x,x°C |  |
| 807 | Offset T12 | 40820 | Integer | R/W | 1 | x,x°C |  |
| 808 | Offset T13 | 40821 | Integer | R/W | 1 | x,x°C |  |
| 809 | Offset 2T1 | 40822 | Integer | R/W | 1 | x,x°C |  |
| 810 | Offset 3T1 | 40823 | Integer | R/W | 1 | x,x°C |  |
| 811 | Offset 4T1 | 40824 | Integer | R/W | 1 | x,x°C |  |
| 812 | Offset 5T1 | 40825 | Integer | R/W | 1 | x,x°C |  |
| 813 | Offset 6T1 | 40826 | Integer | R/W | 1 | x,x°C |  |
| 814 | Offset 7T1 | 40827 | Integer | R/W | 1 | x,x°C |  |
| 815 | Timeout ext. Boiler | 40828 | Integer | R/W |  | m |  |
| 816 | Min. RL Kessel | 40829 | Integer | R/W |  | °C |  |
| 817 | Anlagennummer | 40830 | Integer | R/W |  |  |  |


## Legionellenschutz und weitere Parameter (Nr 818–929)

| Nr | Bezeichnung | Register | Typ | R/W | Dpkt | Einheit | Wertebereich / Beschreibung |
|----|-------------|----------|-----|-----|------|---------|-----------------------------|
| 818 | Nur ext. Energie bei AUS/FS | 40831 | Integer | R/W |  |  | 0=Nein · 1=Ja |
| 819 | Ext. Energie und Fernwärme parallel | 40832 | Integer | R/W |  |  | 0=Nein · 1=Ja |
| 820 | Solltemp. Legionellen Boiler 1 | 40833 | Integer | R/W |  | °C |  |
| 821 | VL-Temp. Legionellen Boiler 1 | 40834 | Integer | R/W |  | °C |  |
| 822 | Solltemp. Legionellen Boiler 2 | 40835 | Integer | R/W |  | °C |  |
| 823 | VL-Temp. Legionellen Boiler 2 | 40836 | Integer | R/W |  | °C |  |
| 824 | Hysterese Zirkulation | 40837 | Integer | R/W | 1 | x,x°C |  |
| 825 | Legionellenzirkulation Boiler 1 | 40838 | Integer | R/W |  |  | 0=Nein · 1=Ja |
| 826 | Legionellenzirkulation Boiler 2 | 40839 | Integer | R/W |  |  | 0=Nein · 1=Ja |
| 827 | Startzeit Legionellenladung Boiler 1 | 40840 | Integer | R/W |  | hhmm |  |
| 828 | Startzeit Legionellenladung Boiler 2 | 40841 | Integer | R/W |  | hhmm |  |
| 829 | [Reserviert] | 40842 | Integer | R/W |  |  |  |
| 830 | BT Pairing Code | 40843 | Integer | R/W |  |  | Bluetooth-Kopplungscode |
| 831 | Tagkorrektur Heizkreis 0 | 40844 | Integer | R/W | 1 | x,x°C |  |
| 832 | Tagkorrektur Heizkreis 1 | 40845 | Integer | R/W | 1 | x,x°C |  |
| 833 | Tagkorrektur Heizkreis 2 | 40846 | Integer | R/W | 1 | x,x°C |  |
| 834 | Tagkorrektur Heizkreis 3 | 40847 | Integer | R/W | 1 | x,x°C |  |
| 835 | Tagkorrektur Heizkreis 4 | 40848 | Integer | R/W | 1 | x,x°C |  |
| 836 | Tagkorrektur Heizkreis 5 | 40849 | Integer | R/W | 1 | x,x°C |  |
| 837 | Tagkorrektur Heizkreis 6 | 40850 | Integer | R/W | 1 | x,x°C |  |
| 838 | Tagkorrektur Heizkreis 7 | 40851 | Integer | R/W | 1 | x,x°C |  |
| 839 | Ventilsynchronisation | 40852 | Integer | R/W |  |  | 0=Aus · 1=Montag … 7=Sonntag (0=Aus, sonst Wochentag) |
| 840 | Funktion ComA | 40853 | Integer | R/W |  |  |  |
| 841 | Funktion ComB | 40854 | Integer | R/W |  |  |  |
| 842 | Funktion ComC | 40855 | Integer | R/W |  |  |  |
| 843 | Zubringpumpe nur mit FW aktiv | 40856 | Integer | R/W |  |  | 0=Nein · 1=Ja |
| 844 | Fernbedienung per Bus HK 0 | 40857 | Integer | R/W |  |  | 0=Nein · 1=Ja |
| 845 | Fernbedienung per Bus HK 1 | 40858 | Integer | R/W |  |  | 0=Nein · 1=Ja |
| 846 | Fernbedienung per Bus HK 2 | 40859 | Integer | R/W |  |  | 0=Nein · 1=Ja |
| 847 | Fernbedienung per Bus HK 3 | 40860 | Integer | R/W |  |  | 0=Nein · 1=Ja |
| 848 | Fernbedienung per Bus HK 4 | 40861 | Integer | R/W |  |  | 0=Nein · 1=Ja |
| 849 | Fernbedienung per Bus HK 5 | 40862 | Integer | R/W |  |  | 0=Nein · 1=Ja |
| 850 | Fernbedienung per Bus HK 6 | 40863 | Integer | R/W |  |  | 0=Nein · 1=Ja |
| 851 | Fernbedienung per Bus HK 7 | 40864 | Integer | R/W |  |  | 0=Nein · 1=Ja |
| 852 | Anzahl Subregler | 40865 | Integer | R/W |  |  |  |
| 853 | Handbetrieb Pumpe Boiler 1 | 40866 | Integer | R/W |  |  | 0=Aus · 1=Ein · 2=Auto |
| 854 | Handbetrieb Pumpe Boiler 2 | 40867 | Integer | R/W |  |  | 0=Aus · 1=Ein · 2=Auto |
| 855 | Laufzeit Ventil Heizkreis 0 | 40868 | Integer | R/W |  | s |  |
| 856 | Laufzeit Ventil Heizkreis 1 | 40869 | Integer | R/W |  | s |  |
| 857 | Laufzeit Ventil Heizkreis 2 | 40870 | Integer | R/W |  | s |  |
| 858 | Laufzeit Ventil Heizkreis 3 | 40871 | Integer | R/W |  | s |  |
| 859 | Laufzeit Ventil Heizkreis 4 | 40872 | Integer | R/W |  | s |  |
| 860 | Laufzeit Ventil Heizkreis 5 | 40873 | Integer | R/W |  | s |  |
| 861 | Laufzeit Ventil Heizkreis 6 | 40874 | Integer | R/W |  | s |  |
| 862 | Laufzeit Ventil Heizkreis 7 | 40875 | Integer | R/W |  | s |  |
| 863 | COM D – Baudrate | 40876 | Integer | R/W |  |  | 0=300 · 1=600 · 2=1200 · 3=2400 · 4=4800 · 5=9600 · 6=14400 · 7=19200 · 8=28800 · 9=38400 · 10=57600 · 11=115200 |
| 864 | B-Config FBS (Klemme 15) | 40877 | Integer | R/W |  |  |  |
| 865 | 1-Config HKM1-FBS | 40878 | Integer | R/W |  |  |  |
| 866 | 2-Config HKM2-FBS | 40879 | Integer | R/W |  |  |  |
| 867 | 3-Config HKM3-FBS | 40880 | Integer | R/W |  |  |  |
| 868 | 4-Config HKM4-FBS | 40881 | Integer | R/W |  |  |  |
| 869 | 5-Config HKM5-FBS | 40882 | Integer | R/W |  |  |  |
| 870 | 6-Config HKM6-FBS | 40883 | Integer | R/W |  |  |  |
| 871 | 7-Config HKM7-FBS | 40884 | Integer | R/W |  |  |  |


## PWM- und Pumpen-Konfiguration (Nr 872–929)

| Nr | Bezeichnung | Register | Typ | R/W | Dpkt | Einheit | Wertebereich / Beschreibung |
|----|-------------|----------|-----|-----|------|---------|-----------------------------|
| 872 | C-PWM Config Pumpe (Klemme 2) | 40885 | Integer | R/W |  | % |  |
| 873 | D-PWM Config Pumpe (Klemme 3) | 40886 | Integer | R/W |  | % |  |
| 874 | B-PWM Config Pumpe (Klemme 1) | 40887 | Integer | R/W |  | % |  |
| 875 | 1-PWM Config Pumpe HKM1-1 | 40888 | Integer | R/W |  | % |  |
| 876 | 2-PWM Config Pumpe HKM2-1 | 40889 | Integer | R/W |  | % |  |
| 877 | 3-PWM Config Pumpe HKM3-1 | 40890 | Integer | R/W |  | % |  |
| 878 | 4-PWM Config Pumpe HKM4-1 | 40891 | Integer | R/W |  | % |  |
| 879 | 5-PWM Config Pumpe HKM5-1 | 40892 | Integer | R/W |  | % |  |
| 880 | 6-PWM Config Pumpe HKM6-1 | 40893 | Integer | R/W |  | % |  |
| 881 | 7-PWM Config Pumpe HKM7-1 | 40894 | Integer | R/W |  | % |  |
| 882 | A-PWM Config Mischer (Klemme 4) | 40895 | Integer | R/W |  | % |  |
| 883 | 1-PWM Config Mischer HKM1-2 | 40896 | Integer | R/W |  | % |  |
| 884 | 2-PWM Config Mischer HKM2-2 | 40897 | Integer | R/W |  | % |  |
| 885 | 3-PWM Config Mischer HKM3-2 | 40898 | Integer | R/W |  | % |  |
| 886 | 4-PWM Config Mischer HKM4-2 | 40899 | Integer | R/W |  | % |  |
| 887 | 5-PWM Config Mischer HKM5-2 | 40900 | Integer | R/W |  | % |  |
| 888 | 6-PWM Config Mischer HKM6-2 | 40901 | Integer | R/W |  | % |  |
| 889 | 7-PWM Config Mischer HKM7-2 | 40902 | Integer | R/W |  | % |  |
| 890 | C-Max. Rücklauftemp. | 40903 | Integer | R/W |  | °C |  |
| 891 | D-Max. Rücklauftemp. | 40904 | Integer | R/W |  | °C |  |
| 892 | B-Max. Rücklauftemp. | 40905 | Integer | R/W |  | °C |  |
| 893 | 1-Max. Rücklauftemp. | 40906 | Integer | R/W |  | °C |  |
| 894 | 2-Max. Rücklauftemp. | 40907 | Integer | R/W |  | °C |  |
| 895 | 3-Max. Rücklauftemp. | 40908 | Integer | R/W |  | °C |  |
| 896 | 4-Max. Rücklauftemp. | 40909 | Integer | R/W |  | °C |  |
| 897 | 5-Max. Rücklauftemp. | 40910 | Integer | R/W |  | °C |  |
| 898 | 6-Max. Rücklauftemp. | 40911 | Integer | R/W |  | °C |  |
| 899 | 7-Max. Rücklauftemp. | 40912 | Integer | R/W |  | °C |  |
| 900 | C-Min. Drehzahl Pumpe | 40913 | Integer | R/W |  | % |  |
| 901 | D-Min. Drehzahl Pumpe | 40914 | Integer | R/W |  | % |  |
| 902 | B-Min. Drehzahl Pumpe | 40915 | Integer | R/W |  | % |  |
| 903 | 1-Min. Drehzahl Pumpe | 40916 | Integer | R/W |  | % |  |
| 904 | 2-Min. Drehzahl Pumpe | 40917 | Integer | R/W |  | % |  |
| 905 | 3-Min. Drehzahl Pumpe | 40918 | Integer | R/W |  | % |  |
| 906 | 4-Min. Drehzahl Pumpe | 40919 | Integer | R/W |  | % |  |
| 907 | 5-Min. Drehzahl Pumpe | 40920 | Integer | R/W |  | % |  |
| 908 | 6-Min. Drehzahl Pumpe | 40921 | Integer | R/W |  | % |  |
| 909 | 7-Min. Drehzahl Pumpe | 40922 | Integer | R/W |  | % |  |
| 910 | C-Manuelle Drehzahl Pumpe | 40923 | Integer | R/W |  | % |  |
| 911 | D-Manuelle Drehzahl Pumpe | 40924 | Integer | R/W |  | % |  |
| 912 | B-Manuelle Drehzahl Pumpe | 40925 | Integer | R/W |  | % |  |
| 913 | 1-Manuelle Drehzahl Pumpe | 40926 | Integer | R/W |  | % |  |
| 914 | 2-Manuelle Drehzahl Pumpe | 40927 | Integer | R/W |  | % |  |
| 915 | 3-Manuelle Drehzahl Pumpe | 40928 | Integer | R/W |  | % |  |
| 916 | 4-Manuelle Drehzahl Pumpe | 40929 | Integer | R/W |  | % |  |
| 917 | 5-Manuelle Drehzahl Pumpe | 40930 | Integer | R/W |  | % |  |
| 918 | 6-Manuelle Drehzahl Pumpe | 40931 | Integer | R/W |  | % |  |
| 919 | 7-Manuelle Drehzahl Pumpe | 40932 | Integer | R/W |  | % |  |
| 920 | A-Manuelle Öffnung Mischer (4) | 40933 | Integer | R/W |  | % |  |
| 921 | 1-Manuelle Öffnung Mischer | 40934 | Integer | R/W |  | % |  |
| 922 | 2-Manuelle Öffnung Mischer | 40935 | Integer | R/W |  | % |  |
| 923 | 3-Manuelle Öffnung Mischer | 40936 | Integer | R/W |  | % |  |
| 924 | 4-Manuelle Öffnung Mischer | 40937 | Integer | R/W |  | % |  |
| 925 | 5-Manuelle Öffnung Mischer | 40938 | Integer | R/W |  | % |  |
| 926 | 6-Manuelle Öffnung Mischer | 40939 | Integer | R/W |  | % |  |
| 927 | 7-Manuelle Öffnung Mischer | 40940 | Integer | R/W |  | % |  |
| 928 | ComC auf Heizkreis | 40941 | Integer | R/W |  |  |  |
| 929 | Regelart Basis C | 40942 | Integer | R/W |  |  |  |


## Weitere Systemparameter (Nr 930–1031)

| Nr | Bezeichnung | Register | Typ | R/W | Dpkt | Einheit | Wertebereich / Beschreibung |
|----|-------------|----------|-----|-----|------|---------|-----------------------------|
| 930 | Regelart Basis D | 40943 | Integer | R/W |  |  |  |
| 931 | C-Max. Drehzahl Pumpe | 40944 | Integer | R/W |  | % |  |
| 932 | D-Max. Drehzahl Pumpe | 40945 | Integer | R/W |  | % |  |
| 933 | B-Max. Drehzahl Pumpe | 40946 | Integer | R/W |  | % |  |
| 934 | 1-Max. Drehzahl Pumpe | 40947 | Integer | R/W |  | % |  |
| 935 | 2-Max. Drehzahl Pumpe | 40948 | Integer | R/W |  | % |  |
| 936 | 3-Max. Drehzahl Pumpe | 40949 | Integer | R/W |  | % |  |
| 937 | 4-Max. Drehzahl Pumpe | 40950 | Integer | R/W |  | % |  |
| 938 | 5-Max. Drehzahl Pumpe | 40951 | Integer | R/W |  | % |  |
| 939 | 6-Max. Drehzahl Pumpe | 40952 | Integer | R/W |  | % |  |
| 940 | 7-Max. Drehzahl Pumpe | 40953 | Integer | R/W |  | % |  |
| 941 | FWM Solltemperatur | 40954 | Integer | R/W |  | °C | Fernwärmemodul Solltemperatur |
| 942 | P-Bereich Basis C | 40955 | Integer | R/W |  | °C |  |
| 943 | P-Bereich Basis D | 40956 | Integer | R/W |  | °C |  |
| 944 | P-Bereich Klemme 1 (B) | 40957 | Integer | R/W |  | °C |  |
| 945 | P-Bereich Klemme 1.1 | 40958 | Integer | R/W |  | °C |  |
| 946 | P-Bereich Klemme 2.1 | 40959 | Integer | R/W |  | °C |  |
| 947 | P-Bereich Klemme 3.1 | 40960 | Integer | R/W |  | °C |  |
| 948 | P-Bereich Klemme 4.1 | 40961 | Integer | R/W |  | °C |  |
| 949 | P-Bereich Klemme 5.1 | 40962 | Integer | R/W |  | °C |  |
| 950 | P-Bereich Klemme 6.1 | 40963 | Integer | R/W |  | °C |  |
| 951 | P-Bereich Klemme 7.1 | 40964 | Integer | R/W |  | °C |  |
| 952 | I-Faktor Pumpe Basis C | 40965 | Integer | R/W |  |  |  |
| 953 | I-Faktor Pumpe Basis D | 40966 | Integer | R/W |  |  |  |
| 954 | I-Faktor Pumpe Klemme 1 | 40967 | Integer | R/W |  |  |  |
| 955 | I-Faktor Pumpe Klemme 1.1 | 40968 | Integer | R/W |  |  |  |
| 956 | I-Faktor Pumpe Klemme 2.1 | 40969 | Integer | R/W |  |  |  |
| 957 | I-Faktor Pumpe Klemme 3.1 | 40970 | Integer | R/W |  |  |  |
| 958 | I-Faktor Pumpe Klemme 4.1 | 40971 | Integer | R/W |  |  |  |
| 959 | I-Faktor Pumpe Klemme 5.1 | 40972 | Integer | R/W |  |  |  |
| 960 | I-Faktor Pumpe Klemme 6.1 | 40973 | Integer | R/W |  |  |  |
| 961 | I-Faktor Pumpe Klemme 7.1 | 40974 | Integer | R/W |  |  |  |
| 963–999 | Res_para (reserviert) | 40976 | Integer | R/W |  |  | Interne Reserveparameter |


## Istwerte Pumpen/Mischer/PWM (Nr 1000–1133)

| Nr | Bezeichnung | Register | Typ | R/W | Dpkt | Einheit | Wertebereich / Beschreibung |
|----|-------------|----------|-----|-----|------|---------|-----------------------------|
| 1000–1009 | C/D/B/1..7-PWM Pumpe | 40999 | Integer | R |  | % | Ist-PWM-Ausgangswert je Pumpenkanal |
| 1010–1019 | A/1..7-PWM Mischer + B-PWM + FWVentil | 41009 | Integer | R |  | % | Ist-PWM-Ausgangswert je Mischerkanal |
| 1020–1029 | C/D/B/1..7-Rücklauftemp. | 41019 | Integer | R | 1 | °C | Ist-RL-Temperatur je Kanal |
| 1030 | Istwert Reserve | 41029 | Integer | R |  |  |  |
| 1031–1041 | C/D/A-berechn.Drehzahl, 1..7-Pumpe | 41030 | Integer | R |  | % | Berechnete Pumpendrehzahl |
| 1042–1048 | 1..7-berechn.Stellung Mischer | 41041 | Integer | R |  | % | Berechnete Mischerstellung |
| 1049–1051 | Istwert Reserve (3×) | 41048 | Integer | R |  |  |  |
| 1052–1055 | Prozessor PWM 1–4 (0..255) | 41051 | Integer | R |  |  | Rohwerte Mikroprozessor-PWM |
| 1056 | Ventilstellung FW Ventil | 41055 | Integer | R |  | % |  |
| 1057 | B-Ventilstellung | 41056 | Integer | R |  | % |  |
| 1058–1064 | 1..7-Ventilstellung | 41057 | Integer | R |  | % |  |
| 1065–1072 | B/1..7-Solltemp. Raum | 41064 | Integer | R | 1 | °C |  |
| 1073–1074 | C/D-PWM Ausgang Lademodulmischer | 41072 | Integer | R |  | % |  |
| 1075 | FWM Isttemp. WW | 41074 | Integer | R | 1 | °C | Fernwärmemodul |
| 1076 | FWM Freigabe Modul | 41075 | Integer | R |  |  |  |
| 1077 | FWM Drehzahl Pumpe | 41076 | Integer | R |  | % |  |
| 1078 | FWM Status Pumpe | 41077 | Integer | R |  |  |  |
| 1079 | FWM Ütemp. WW | 41078 | Integer | R | 1 | °C |  |
| 1080 | Status Mischer Mengenreg. Speich. 1 | 41079 | Integer | R |  |  |  |
| 1081 | Status Mischer Mengenreg. Speich. 2 | 41080 | Integer | R |  |  |  |
| 1082–1133 | Istwert Reserve (52×) | 41081 | Integer | R |  |  | Reservierte Istwertregister |


## Zähler 1 – MBus-Wärmemengenzähler direkt (ab Register 41147, Nr 1148+)

Die Zähler-1-Daten stehen in einem zweiten Register-Block ab 41147 (Nr 1148) parallel zum WMZ-Block ab 40731 zur Verfügung. 32-Bit-Werte (unsigned long) belegen zwei aufeinanderfolgende Register.

| Nr | Bezeichnung | Register | Typ | R/W | Dpkt | Einheit | Wertebereich / Beschreibung |
|----|-------------|----------|-----|-----|------|---------|-----------------------------|
| 1148 | Zähler 1 – Wärmemenge | 41147 | unsigned long | R |  | kWh | Higher 16Bit → Reg 41147/41148 |
| … | Zähler 1 – Volumen | 41149 | unsigned long | R |  | l | Reg 41149/41150 |
| … | Zähler 1 – Leistung | 41151 | unsigned long | R |  | W | Reg 41151/41152 |
| … | Zähler 1 – Stichtagszählerstand | 41153 | unsigned long | R |  |  | Reg 41153/41154 |
| … | Zähler 1 – Seriennummer | 41155 | unsigned long | R |  |  | Reg 41155/41156 |
| … | Zähler 1 – Durchfluss long | 41157 | unsigned long | R |  |  | Reg 41157/41158 |
| … | Zähler 1 – Impulseingang A | 41159 | unsigned long | R |  |  | Reg 41159/41160 |
| … | Zähler 1 – Fehleranzeige | 41161 | Integer | R |  |  |  |
| … | Zähler 1 – Durchfluss int. | 41162 | Integer | R |  | l/h |  |
| … | Zähler 1 – Rücklauftemp. | 41163 | Integer | R |  | x.xx°C |  |
| … | Zähler 1 – Vorlauftemp. | 41164 | Integer | R |  | x.xx°C |  |
| … | Zähler 1 – Spreizung | 41165 | Integer | R |  | x.xx°C |  |
| … | Zähler 1 – Betriebstage | 41166 | Integer | R |  |  |  |
| … | Zähler 1 – Fehltage | 41167 | Integer | R |  |  |  |
| … | Zähler 1 – Impulseingang B | 41168 | unsigned long | R |  |  | Reg 41168/41169 |
| … | Zähler 1 – Tarif 1 | 41170 | unsigned long | R |  | kWh | Reg 41170/41171 |
| … | Zähler 1 – Tariflimit 1 | 41172 | unsigned long | R |  | °C | Reg 41172/41173 |
| … | Zähler 1 – Tarif 2 | 41174 | unsigned long | R |  | kWh | Reg 41174/41175 |
| … | Zähler 1 – Tariflimit 2 | 41176 | unsigned long | R |  | °C | Reg 41176/41177 |
| … | Zähler 1 – Tarif 3 | 41178 | unsigned long | R |  | kWh | Reg 41178/41179 |
| … | Zähler 1 – Tariflimit 3 | 41180 | unsigned long | R |  | °C | Reg 41180/41181 |
| … | Zähler 1 – HerstellerID | 41182 | Integer | R |  |  |  |
| … | Zähler 1 – StatusByte | 41183 | Integer | R |  |  |  |
| … | Zähler 1 – Version | 41184 | Integer | R |  |  |  |


## Reservierte Istwertregister (Nr 1134–1232)

Die Register Nr 1134–1232 (Registeradressen 41133–41231) sind als **Istwert Reserve** definiert
und für zukünftige Erweiterungen vorgesehen. Alle Register: Integer, Read-only (R).


## Zähler 2 – Erweiterter MBus-Block (ab Register 42731)

Ein zweiter Zählerdatensatz ist ab Registeradresse 42731 zugänglich. Struktur identisch mit Zähler 1.

| Nr | Bezeichnung | Register | Typ | R/W | Dpkt | Einheit | Wertebereich / Beschreibung |
|----|-------------|----------|-----|-----|------|---------|-----------------------------|
| – | Zähler 2 – Wärmemenge | 42731 | unsigned long | R |  | kWh | Reg 42731/42732 |
| – | Zähler 2 – Volumen | 42733 | unsigned long | R |  | l | Reg 42733/42734 |
| – | Zähler 2 – Leistung | 42735 | unsigned long | R |  | W | Reg 42735/42736 |
| – | Zähler 2 – Stichtagszählerstand | 42737 | unsigned long | R |  |  | Reg 42737/42738 |
| – | Zähler 2 – Seriennummer | 42739 | unsigned long | R |  |  | Reg 42739/42740 |
| – | Zähler 2 – Durchfluss long | 42741 | unsigned long | R |  |  | Reg 42741/42742 |
| – | Zähler 2 – Impulseingang A | 42743 | unsigned long | R |  |  | Reg 42743/42744 |
| – | Zähler 2 – Fehleranzeige | 42745 | Integer | R |  |  |  |
| – | Zähler 2 – Durchfluss int. | 42746 | Integer | R |  | l/h |  |
| – | Zähler 2 – Rücklauftemp. | 42747 | Integer | R |  | x.xx°C |  |
| – | Zähler 2 – Vorlauftemp. | 42748 | Integer | R |  | x.xx°C |  |
| – | Zähler 2 – Spreizung | 42749 | Integer | R |  | x.xx°C |  |
| – | Zähler 2 – Betriebstage | 42750 | Integer | R |  |  |  |
| – | Zähler 2 – Fehltage | 42751 | Integer | R |  |  |  |
| – | Zähler 2 – Impulseingang B | 42752 | unsigned long | R |  |  | Reg 42752/42753 |
| – | Zähler 2 – Tarif 1 | 42754 | unsigned long | R |  | kWh | Reg 42754/42755 |
| – | Zähler 2 – Tariflimit 1 | 42756 | unsigned long | R |  | °C | Reg 42756/42757 |
| – | Zähler 2 – Tarif 2 | 42758 | unsigned long | R |  | kWh | Reg 42758/42759 |
| – | Zähler 2 – Tariflimit 2 | 42760 | unsigned long | R |  | °C | Reg 42760/42761 |
| – | Zähler 2 – Tarif 3 | 42762 | unsigned long | R |  | kWh | Reg 42762/42763 |
| – | Zähler 2 – Tariflimit 3 | 42764 | unsigned long | R |  | °C | Reg 42764/42765 |
| – | Zähler 2 – HerstellerID | 42766 | Integer | R |  |  |  |
| – | Zähler 2 – StatusByte | 42767 | Integer | R |  |  |  |
| – | Zähler 2 – Version | 42768 | Integer | R |  |  |  |


## Hinweise

### Timing und Delays

- **Antwort-Delay RTU:** Mindestens **50 ms** zwischen Anfrage und Antwort einhalten.
- **Baudrate RTU:** 1200–57600 Baud einstellbar; muss am Regler konfiguriert werden.
- **Baudrate TCP:** 19200–57600 Baud; Standard-Modbus-TCP-Port 502.

### Zugriff und Funktionscodes

- Nur **FC 03** (Read Holding Registers) und **FC 06** (Preset Single Register) werden unterstützt.
- Alle Register liegen im Bereich **40001–49999** (Modbus-Konvention).
- Gleichzeitiges Lesen mehrerer Register mit FC 03 ist möglich.

### Datenformate

- **Integer (16-Bit signed):** Standarddatentyp für alle Temperatur-, Prozent- und Statuswerte.
- **unsigned long (32-Bit):** Belegt **zwei aufeinanderfolgende Register**; erstes Register = Higher Word (Bits 16..31), zweites = Lower Word (Bits 0..15).
- **Dezimalpunkt (Dpkt):** Werte mit Einheit `x,x°C` bzw. `x,x%` sind mit Faktor 10 skaliert (Wert 215 = 21,5°C). Werte mit `x.xx°C` sind mit Faktor 100 skaliert.
- **hhmm:** Zeitwerte sind als Ganzzahl kodiert (z. B. 0630 = 06:30 Uhr, 2345 = 23:45 Uhr).

### Schreiben von Parametern

- R/W-Register können mit FC 06 einzeln geschrieben werden.
- Nach dem Schreiben von Konfigurationsregistern kann eine kurze Verarbeitungszeit im Regler erforderlich sein, bevor der neue Wert wirksam wird.
- Register **Parameter MMC schreiben** (Nr 64, Reg 40063) und **Parameter MMC lesen** (Nr 61, Reg 40060) ermöglichen das Speichern und Laden von Parametersätzen auf die MMC-Karte des Reglers.
- Register **Kaltstart** (Nr 80, Reg 40079): Schreiben von 1 löst einen Neustart aus.

### Konfiguration der Kommunikationsschnittstellen

- **ComA** (Register 40074/40076): Adresse und Baudrate für Kommunikationsport A.
- **ComB** (Register 40077): Baudrate für Kommunikationsport B.
- **ComC** (Register 40075/40078): Adresse und Baudrate für Kommunikationsport C.
- **COM D** (Register 40876): Baudrate für Kommunikationsport D.
- **Funktion ComA/B/C** (Register 40853–40855): Bestimmen die Funktion der jeweiligen seriellen Schnittstelle (z. B. Modbus-Slave, M-Bus-Master).

### Wärmemengenzähler

- Die WMZ-Daten sind doppelt verfügbar: ab Register **40731** (Nr 732, Standard-Block) und ab Register **41147** (Nr 1148, Zähler-1-Block).
- Ein zweiter Zählerdatensatz steht ab **42731** zur Verfügung.
- Unterstützte Zählertypen: Standard M-Bus, Siemens UH50, Danfoss Infocal, Aquamento Calec, Sharky Heart Int6, Sontex Supercal, Siemens clockset, Autotyp 1–3 (siehe Register Nr 73, Reg 40072).
