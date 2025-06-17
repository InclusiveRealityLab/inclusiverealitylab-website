function PublicationListItem() {

    
  return (
    <div class="flex xl:flex-row-reverse  flex-col justify-between items-stretch  xl:max-w-64.5 h-12.5 gap-2 ">
      {/* div for img container */}
      
        <img
          src="../assets/HeroImage.png"
          
          className="xl:w-20 xl:h-12.5 object-cover"
        />
      
      {/* div for pub details */}
      <div class="flex flex-col justify-start items-start pb-1 xl:pt-1 xl:pr-1 xl:pb-1 gap-0.5 border-2">
        <p className="flex bodySmall ">CHI2024</p>
        <p className="bodyBigBold h-5">Cymatics Cup: Shape-Changing Drinks by Leveraging Cymatics</p>
        


        {/* container for the CTA buttons : DOI and PDF links */}
        <div class="flex flex-row w-auto justify-center gap-1.5">
            <button class="label border-1 h-2.5 w-6.5 ">DOI</button>
            <button class="label border-1 h-2.5 w-6.5 ">PDF</button>
        </div>
      </div>
    </div>
  );
}

export default PublicationListItem;
