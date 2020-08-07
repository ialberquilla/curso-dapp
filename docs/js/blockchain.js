var provider;
var signer;
var contract;


window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
        window.ethereum.enable()
        provider = new ethers.providers.Web3Provider(window.ethereum)
        signer = provider.getSigner()
        contract = new ethers.Contract(address, abi, signer)
        showOwnerDiv()
        getCounts()
    }
    else {
        alert('Por favor activa MetaMask para interacturar con el contrato')
    }
})


async function getCounts() {
    const playaCount = await contract.functions.getVoteCount("Playa");
    const montanaCount = await contract.functions.getVoteCount("Montaña");
    var div = document.getElementById('count-playa');
    div.innerHTML = '';
    div.innerHTML = 'Votos playa: ' + playaCount;
    div = document.getElementById('count-montana');
    div.innerHTML = '';
    div.innerHTML = 'Votos montaña: ' + montanaCount;

}


$('.vote-btn').click(function () {
    contract.vote(this.value).then(res => {
        console.log(res)
        transactionResult(res.hash, false)
    }).catch(err => {
        console.log(err)
        transactionResult(err.data.message, true)
    })

})

async function allowAddress(event) {
    event.preventDefault()
    contract.allowVote(event.target.elements.address.value)
        .then(res => {
            console.log(res)
            transactionResult(res.hash, false)
        }).catch(err => {
            console.log(err)
            transactionResult(err.data.message, true)
        })
}

async function showOwnerDiv() {
    const owner = await contract.functions.getOwner();
    const user = await signer.getAddress();
    if (owner == user) {
        document.getElementById('owner').style.visibility = "visible";
    }
}


function transactionResult(result, err) {
    var div = document.getElementById('result-tx');
    div.innerHTML = '';
    div.innerHTML = result;
    if (err) {
        div.classList.add('alert-danger');
    } else {
        div.classList.add('alert-success');
    }
    div.style.visibility = 'visible';
    getCounts();
}