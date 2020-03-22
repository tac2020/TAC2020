import React, { useState } from 'react';
import { Container, Typography, Input, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, FormHelperText } from '@material-ui/core';
import { CheckBox } from '@material-ui/icons';



const checksSym = {
    fever: 20,
    drycough: 30,
    fatigue: 10
}

export default function SymptomCheck() {
    const [chances,setChances] = useState(0);
    const [trchances,setTrchances] = useState(0);
    const [symptoms, setSymptoms] = useState({
        fever : false,
        drycough : false,
        fatigue: false,
        breathlessness: false,
        diarrhea: false,
        musclepain: false
    });
    const [casetravel, setCasetravel] = useState({
        travelhistory : false,
        infectedcontact: false,
        contact: false,
        none : false
    })

    function handleChange(event){
        const { name, checked } = event.target;
        setSymptoms({
            ...symptoms,
            [name]: checked ? true : false, 
        })
        if(symptoms[name]){
            setChances(chances - checksSym[name])
        }else {
            setChances( chances + checksSym[name])

        }
        console.log(symptoms[name]);
    }

    function handleCase(event){
        const { name, checked } = event.target;
        setCasetravel({
            ...casetravel,
            [name]: checked ? true : false, 
        });
       
        

        if(name === "none"){
            setTrchances(0);

            setCasetravel({
                travlehistory : false,
                infectedcontact: false,
                contact: false
            })
        } else {
            setTrchances(100)
        }
        console.log(trchances);

    }

    return (
        <Container style={{marginTop: 30}}>
            <Typography variant="h6">
                प्रारंभिक लक्षणों की पुष्टि की गंभीरता के स्तर के अनुसार, दी गयी जानकारी भारतीय सरकार एवं स्वास्थय विभाग के साथ साझा की जा सकती है| कृपया त्रुटिपूर्ण/गलत जानकारी साझा न करे, आपदा प्रबंधन में अपना योगदान दे|
            </Typography>
            {trchances} {chances}
            <FormControl style={{marginTop: "5%", marginBottom : "5%"}} component="fieldset">
                <FormLabel component="legend">नीचे दिए गए लक्षणों में सबसे सटीक विकल्पों का चुनाव करें</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={symptoms.fever} onChange={handleChange} name="fever" />}
                        label="तेज़ बुखार"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={symptoms.drycough} onChange={handleChange} name="drycough" />}
                        label="सूखी खांसी"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={symptoms.fatigue} onChange={handleChange} name="fatigue" />}
                        label="थकान"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={symptoms.breathlessness} onChange={handleChange} name="breathlessness" />}
                        label="सांस लेने में तकलीफ"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={symptoms.diarrhea} onChange={handleChange} name="diarrhea" />}
                        label="अतिसार/दस्त"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={symptoms.musclepain} onChange={handleChange} name="musclepain" />}
                        label="बदन दर्द"
                    />
                </FormGroup>
                <FormHelperText>Be careful</FormHelperText>

                <br/>
                <br/>
                <FormLabel component="legend">नीचे दिए गए विकल्पों में से स्वतः पर लागू होने वाले विषयो को चुने </FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={!casetravel.none && casetravel.travelhistory} onChange={handleCase} name="travelhistory" />}
                        label="पिछले दिनों में विदेश यात्रा"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={!casetravel.none && casetravel.contact} onChange={handleCase} name="contact" />}
                        label="विदेश से लौटे किसी व्यक्ति के सम्पर्क में आने की अत्याधिक संभावना"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={!casetravel.none && casetravel.infectedcontact} onChange={handleCase} name="infectedcontact" />}
                        label="संक्रमित व्यक्ति के संपर्क में आने की दृढ़ संभावना"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={casetravel.none} onChange={handleCase} name="none" />}
                        label="उपरोक्त कोई लागु नहीं"
                    />
                </FormGroup>
                <FormHelperText>Be careful</FormHelperText>
                <br/>
                <br/>
                <FormLabel>मोबाइल नंबर</FormLabel>
                <Input label="मोबाइल नंबर" placeholder="मोबाइल नंबर" name="mobile" onChange={handleChange} />
            </FormControl>
        </Container>
    )
}