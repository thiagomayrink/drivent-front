export default function Confirm() {
  return(
    <>
      <AuxLegend>Você já escolheu seu quarto:</AuxLegend>
      <ConfirmCard key={1} data={reservedInfos} />
      <Button onClick={() => changeRoom()}> TROCAR DE QUARTO </Button>
    </>);
}
