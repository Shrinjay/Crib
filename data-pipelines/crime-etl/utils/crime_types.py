from enum import Enum


class Crime(Enum):
    BOMB_THREAT = "Bomb Threat"
    HOMICIDE = "Homicide"
    SEX_OFFENCE = "Sex Offence"
    INDECENT_ACT = "Indecent Act"
    THREATENING = "Threatening"
    ASSAULT = "Assault"
    ABDUCTION = "Abduction"
    ROBBERY = "Robbery"
    EXTORTION = "Extortion"
    BREAK_ENTER = "Break and Enter"
    THEFT = "Theft"
    VEHICLE_THEFT = "Vehicle Theft"
    WEAPON = "Weapon"
    PROPERTY_DAMAGE = "Property Damage"
    PROSTITUTION = "Prostitution"
    GAMBLING = "Gambling"
    DRUGS = "Drugs"
    MISSING_PERSON = "Missing Person"
    DISTURBANCE = "Disturbance"
    DISPUTE = "Dispute"
    DOMESTIC_DISPUTE = "Domestic Dispute"
    INTOXICATED = "Public Intoxication"
    MISCHIEF = "Public Mischief"
    SUSPICIOUS = "Suspicious Person"
    VEHICLE_COLLISION = "Vehicle Collision"
    HIT_RUN = "Hit and Run"
    IMPAIRED_DRIVER = "Impaired Driver"
    LIQUOR_OFFENCE = "Liquor Offence"
    ANIMAL_COMPLAINT = "Animal Complaint"
    HUMAN_TRAFFICKING = "Human Trafficking"
    HARASSMENT = "Harassment"
    INTERNET_CRIME = "Internet Crime"
    GRAFFITI = "Graffiti"
    BYLAW = "Bylaw Violation"

COUNTED_CRIMES = {
    Crime.HOMICIDE.value, Crime.SEX_OFFENCE.value, Crime.ASSAULT.value, Crime.WEAPON.value,
    Crime.THREATENING.value, Crime.HARASSMENT.value, Crime.ROBBERY.value, Crime.BREAK_ENTER.value, Crime.THEFT.value,
    Crime.VEHICLE_THEFT.value
}
CRIME_CATGS = {
    'violent': {
        Crime.HOMICIDE.value, Crime.ASSAULT.value
    },
    'stolen_goods': {
        Crime.ROBBERY.value, Crime.THEFT.value, Crime.VEHICLE_THEFT.value
    }
}