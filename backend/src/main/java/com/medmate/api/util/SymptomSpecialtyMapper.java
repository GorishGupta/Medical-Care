package com.medmate.api.util;

import java.util.HashMap;
import java.util.Map;

public class SymptomSpecialtyMapper {

    private static final Map<String, String> symptomToSpecialty = new HashMap<>();
    
    static {
        // Initialize mapping
        symptomToSpecialty.put("arthritis", "Orthopedic");
        symptomToSpecialty.put("back pain", "Orthopedic");
        symptomToSpecialty.put("tissue injuries", "Orthopedic");
        symptomToSpecialty.put("dysmenorrhea", "Gynecology");
        symptomToSpecialty.put("skin infection", "Dermatology");
        symptomToSpecialty.put("skin burn", "Dermatology");
        symptomToSpecialty.put("ear pain", "ENT");
        symptomToSpecialty.put("eye pain", "ENT");
    }
    
    public static String getSpecialtyFromSymptom(String symptomText) {
        if (symptomText == null) return null;
        
        String lowerSymptom = symptomText.toLowerCase();
        
        for (Map.Entry<String, String> entry : symptomToSpecialty.entrySet()) {
            if (lowerSymptom.contains(entry.getKey())) {
                return entry.getValue();
            }
        }
        
        return null;
    }
}
