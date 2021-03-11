import csv
import pandas as pd 
import json

#csvPath = "expedientes_en_tramite.csv"
csvPath = "expedientes_cerrados.csv"
jsonFilePath = "json_file_name.json"

def ConverCsvToJson():
    data = {}
    with open(csvPath) as csvFile:
        csvReader = csv.DictReader(csvFile)
        for rows in csvReader:
            expediente_numero = rows['expediente_numero']
            data[expediente_numero] = rows
    with open(jsonFilePath, 'w') as jsonFile:
        jsonFile.write(json.dumps(data,indent=4))

def expedientePorJueces():
    data = {}
    with open(csvPath) as csvFile:
        csvReader = csv.DictReader(csvFile)

        for rows in csvReader:
            juez = rows['juez_nombre_apellido \xa0']
            if(juez != ""):
                expediente = {
                    'name': rows['caratula_nombre \xa0'],
                    'value': 1
                }
                if juez in data:
                    data[juez]['value'] = data[juez]['value'] + 1
                    if(expediente['name'] != ""):
                        data[juez]['expediente'].append(expediente)
                else:
                    data[juez] = {}
                    data[juez]['value'] = 1
                    data[juez]['expediente'] = []
                    if(expediente['name'] != ""):
                        data[juez]['expediente'].append(expediente)
    data_to_json = []
    for key, value in data.items():
        obj = {}
        obj["name"] = key
        obj["value"] = value['value']
        obj["children"] = value['expediente']
        data_to_json.append(obj)
    
    data_to_json_viz = {
        "name": "Expedientes por Jueces",
        "children": data_to_json
    }
    with open("jueces.json", 'w') as jsonFile:
        jsonFile.write(json.dumps(data_to_json_viz,indent=4))
    
def expedientePorConsejeros():
    data = {}
    with open(csvPath) as csvFile:
        csvReader = csv.DictReader(csvFile)

        for rows in csvReader:
            consejero = rows['consejero_nombre \xa0']
            if(consejero != ""):
                if consejero in data:
                    data[consejero]['value'] = data[consejero]['value'] + 1
                    if(rows['juez_nombre_apellido \xa0'] != ""):
                        data[consejero]['juez'].append(rows['juez_nombre_apellido \xa0'])
                else:
                    data[consejero] = {}
                    data[consejero]['value'] = 1
                    data[consejero]['juez'] = []
                    if(rows['juez_nombre_apellido \xa0'] != ""):
                        data[consejero]['juez'].append(rows['juez_nombre_apellido \xa0'])

    data_to_json = []
    def agrupar_jueces(array_jueces):
        juez = {}
        for j in array_jueces:
            juez[j] = {}
            juez[j]['name'] = j
            juez[j]['value'] = array_jueces.count(j)
        
        return [value for value in juez.values()]
        

    for key, value in data.items():
        obj = {}
        obj["name"] = key
        obj["value"] = value['value']
        obj["children"] = agrupar_jueces(value['juez'])
        
        data_to_json.append(obj)

    data_to_json_viz = {
        "name": "Expedientes por Consejero 2",
        "children": data_to_json
    }
    with open("consejeros.json", 'w') as jsonFile:
        jsonFile.write(json.dumps(data_to_json_viz,indent=4))

def expedientePorDenunciante():
    data = {}
    with open(csvPath) as csvFile:
        csvReader = csv.DictReader(csvFile)

        for rows in csvReader:
            denunciante = rows['denunciante_nombre \xa0']
            if(denunciante != ""):
                expediente = {
                    'name': rows['caratula_nombre \xa0'],
                    'value': 1
                }
                if denunciante in data:
                    data[denunciante]['value'] = data[denunciante]['value'] + 1
                    if(expediente['name'] != ""):
                        data[denunciante]['expediente'].append(expediente)
                else:
                    data[denunciante] = {}
                    data[denunciante]['value'] = 1
                    data[denunciante]['expediente'] = []
                    if(expediente['name'] != ""):
                        data[denunciante]['expediente'].append(expediente)
                
    data_to_json = []
    for key, value in data.items():
        obj = {}
        obj["name"] = key
        obj["value"] = value['value']
        obj["children"] = value['expediente']
        data_to_json.append(obj)
    
    data_to_json_viz = {
        "name": "Expedientes por Denunciantes",
        "children": data_to_json
    }
    with open("denunciantes.json", 'w') as jsonFile:
        jsonFile.write(json.dumps(data_to_json_viz,indent=4))
    
    

#ConverCsvToJson()
expedientePorJueces()
expedientePorConsejeros()
expedientePorDenunciante()