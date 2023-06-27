import json
import requests

def get_data(url, params):
    res = requests.get(url=url,params=params,timeout=1000)
    data = res.json()
    return data['result']

def get_etherscan_data(startblock):
    url = "https://api.etherscan.io/api"
    module = "account"
    action = "tokentx"
    contractaddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
    page = "1"
    offset = "10000"
    # startblock = "0"
    endblock = "27025780"
    sort = "asc"
    apikey = "6SCC4GNDDUG9SIG4T4QGV6IGZFPD6QC7R1"
    params = {"module":module,"action":action,"contractaddress":contractaddress,"page":page,"offset":offset,"startblock":startblock,"endblock":endblock,"sort":sort,"apikey":apikey}

    result = get_data(url, params)
    if not result:
        print("Error: Result is empty")
        return None
    last_block_number = 0
    with open('dataUSDT.json', 'a') as f:
        # Loop through each object in the result
        for obj in result:
            # Extract relevant data from the object
            js = {
                'blockNumber': obj['blockNumber'],
                'from': obj['from'],
                'to': obj['to'],
                'value': obj['value'],
                'hash' :obj['hash']
            }
            # Convert the data to a JSON string with indentation and sorting
            jsstr = json.dumps(js, indent=4, sort_keys=True)
            # Append the JSON string to the file and add a newline character
            f.write(jsstr + '\n')
            # Print the JSON string
            print(jsstr)
            last_block_number = int(obj['blockNumber'])
    print(f"Last block number: {last_block_number}")
    return last_block_number




startnumber = 0

while(startnumber<27025780):
    try:
        tem = get_etherscan_data(startnumber)
        startnumber =tem
    except Exception as e:
        print(f"Error: {e}")
