import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

const SizeChart = (props) => {
    const {modalOpen, setModalOpen} = props;
    return (
        <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
            <DialogContent>
              <header className="size-guide__heading">
                Size Guides: Short sleeve T-shirts (Centimeters)
              </header>
              <div>
                <table>
                  <tbody>
                  <tr>
                    <th> </th>
                    <th>S</th>
                    <th>M</th>
                    <th>L</th>
                    <th>XL</th>
                  </tr>
                  <tr>
                    <th>Shoulders</th>
                    <th>44</th>
                    <th>47</th>
                    <th>50</th>
                    <th>53</th>
                  </tr>
                  <tr>
                    <th>Chest</th>
                    <th>49</th>
                    <th>52</th>
                    <th>55</th>
                    <th>58.5</th>
                  </tr>
                  <tr>
                    <th>Length</th>
                    <th>66</th>
                    <th>70</th>
                    <th>73</th>
                    <th>76</th>
                  </tr>
                  </tbody>
                </table>
              </div>
              <header className="size-guide__heading">
                Sweatshirt (Centimeters)
              </header>
              <div>
                <table>
                  <tbody>
                  <tr>
                    <th> </th>
                    <th>M</th>
                    <th>L</th>
                  </tr>
                  <tr>
                    <th>Chest</th>
                    <th>63</th>
                    <th>66</th>
                  </tr>
                  <tr>
                    <th>Sleeves</th>
                    <th>54</th>
                    <th>57</th>
                  </tr>
                  <tr>
                    <th>Length</th>
                    <th>67</th>
                    <th>69</th>
                  </tr>
                  </tbody>
                </table>
              </div>
            </DialogContent>
          </Dialog>
    );
}

export default SizeChart;